const Service = require('egg').Service;

module.exports = app => {
    class UserService extends app.Service {
      async index() {
        let result =  await this.ctx.model.User.find();
        return result;
      }
      async login() {
        let users = await this.ctx.model.User.find(this.ctx.request.body);
        return users;
      }

      async sign() {
        let userInfo = this.ctx.request.body;
        let result = await this.ctx.model.User.create(userInfo);
        return result;
      }
   
    }
    return UserService;
  };