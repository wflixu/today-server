"use strict";

const Controller = require("egg").Controller;

const path = require("path");
const FileType = require('file-type');
const sendToWormhole = require("stream-wormhole");
const { streamToBuffer } = require("@jorgeferrero/stream-to-buffer");

class ChunkController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Chunk.find({}, { data: 0 })
      .skip(0)
      .limit(Number(100))
      .sort({ createdAt: -1 })
      .exec();
    ctx.helper.success({ctx,res})

  }
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.model.Chunk.findById(id);
    const strFiles = [".svg"];
    const { filename, extname, mime } = res;
    const encodeName = encodeURI(filename);
    console.warn("filename:", filename,mime);
    // http 头不能有汉字
    // 下载
    // ctx.set("Content-Disposition", `attachment; filename=${encodeName}`);
    ctx.set("Content-Type", mime ?? "application/octet-stream");
    const body =
      res.mime == "text/*" || strFiles.includes(extname)
        ? res.data.toString()
        : res.data;

    ctx.body = body;
  }

  async create() {
    const { ctx, config } = this;

    const stream = await ctx.getFileStream();

    const filename = path.basename(stream.filename); // 文件名称
    const extname = path.extname(stream.filename).toLowerCase();

    try {
      const buffers = await streamToBuffer(stream);
      const filetype = await FileType.fromBuffer(buffers);
      console.log("filetype:", filetype);

      const saveres = await ctx.model.Chunk.create({
        data: buffers,
        filename,
        extname,
        mime: filetype ? filetype.mime : "text/*",
      });
      console.log("保存结果：", saveres);

      ctx.helper.success({
        ctx,
        res: {
          _id: saveres._id,
          filename: saveres.filename,
          extname: saveres.extname,
        },
      });
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      console.warn("-------", err);
      throw err;
    }
  }
  async upload() {
    const { ctx, config } = this;
    console.log(ctx.request);
    // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
    // 只支持上传一个文件。
    // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields` 获取到
    console.log("stream.filename:", stream);
    const filename = path.basename(stream.filename); // 文件名称
    const extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
    // 组装参数 model
    // const attachment = new this.ctx.model.Attachment();
    // attachment.extname = extname;
    // attachment.filename = filename;
    // attachment.url = `/public/uploads/${attachment._id.toString()}${extname}`;

    try {
      const buffers = await streamToBuffer(stream);
      console.warn("filename:", filename);
      const saveres = await ctx.model.Chunk.create({
        data: buffers,
        filename,
        extname,
      });
      console.log("保存结果：", saveres);

      ctx.helper.success({
        ctx,
        res: {
          _id: saveres._id,
          filename: saveres.filename,
          extname: saveres.extname,
        },
      });
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      console.warn("-------", err);
      throw err;
    }

    // ctx.body = 'upload sucess';
    // ctx.status = 200;
  }
}

module.exports = ChunkController;
