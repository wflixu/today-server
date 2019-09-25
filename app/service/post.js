const Service = require('egg').Service;
var cuid = require('cuid');

module.exports = app => {
    class UserService extends app.Service {
        async index() {
            let result = await this.ctx.model.User.find();
            return result;
        }
        async login() {
            let users = await this.ctx.model.User.find(this.ctx.request.body);
            return users;
        }

        async upload() {
            let { request } = this.ctx;
            let file = request.files[0];
            let { uname,text } = request.body;

            let post = await this.ctx.model.Post.create({
                uid:uname,
                text,
                img:file,
                pid:cuid()
            });
            if(post){
                return 'success';
            }else{
                return 'error';
            }
        }

    }
    return UserService;
};