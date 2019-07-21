// {app_root}/app/controller/user.js
const Controller = require('egg').Controller;

const path = require('path');
const fs = require('fs');
const pump = require('mz-modules/pump');
const mkdirp = require('mz-modules/mkdirp');
const Grid = require('gridfs-stream');
var cuid = require('cuid');


class UserController extends Controller {
    async index() {
        await this.ctx.render('user.html');
    }

    async sign() {
        const result = await this.ctx.service.user.sign();
        this.ctx.body = result;
    }
    async login() {
        const result = await this.ctx.service.user.login();
        if (result.length == 1) {
            this.ctx.body = 'success';
        } else {
            this.ctx.body = 'error';
        }
        this.ctx.status = 200;
    }
    async post() {
        const { ctx } = this;
        const { uname, text } = ctx.request.body;
        const file = ctx.request.files[0];
        const filename = cuid() + path.extname(file.filename).toLowerCase();
        const targetPath = path.join(this.config.baseDir, `app/public/uploads/${uname}`, filename);
        await mkdirp(path.join(this.config.baseDir, `app/public/uploads/${uname}`));
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(path.resolve(targetPath));

        try {
           
            await pump(source, target);

            ctx.logger.warn('save %s to %s', file.filepath, targetPath);
            ctx.model.Post.create({
                pid: cuid(),
                text: text,
                uid:uname,
                img: `${uname}/${filename}`
            })
        } finally {
            // delete those request tmp files
            await ctx.cleanupRequestFiles();
        }


        // const fields = [];
        // for (const k in ctx.request.body) {
        //     fields.push({
        //         key: k,
        //         value: ctx.request.body[k],
        //     });
        // }
        ctx.body = { url: '/public/' + uname + '/' + filename };

    }
}

module.exports = UserController;