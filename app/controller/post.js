const Controller = require("egg").Controller;

class PostController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.PostCreateTransfer = {
      mobile: {type: 'string', allowEmpty: true, format: /^[0-9]{11}$/},
      password: { type: "password", required: true, allowEmpty: false, min: 3 },
      postname: {
        type: "string",
        required: true,
        allowEmpty: false,
        // format: /^[\u2E80-\u9FFF]{2,6}$/
      },
    };

    this.PostUpdateTransfer = {
      // mobile: { type: 'string', required: true, allowEmpty: false },
      postname: {
        type: "string",
        required: true,
        allowEmpty: false,
        format: /^[\u2E80-\u9FFF]{2,6}$/,
      },
    };
  }

  // 创建post
  async create() {
    const { ctx, service } = this;
    // 校验参数
    // ctx.validate(this.PostCreateTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.post.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 删除单个用户
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.post.destroy(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  // 修改用户
  async update() {
    const { ctx, service } = this;
    // // 校验参数
    // ctx.validate(this.PostUpdateTransfer);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.post.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.post.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取所有用户(分页/模糊)
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.post.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 删除所选用户(条件id[])
  async removes() {
    const { ctx, service } = this;
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body;
    const payload = id.split(",") || [];
    // 调用 Service 进行业务处理
    const result = await service.post.removes(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }
}

module.exports = PostController;
