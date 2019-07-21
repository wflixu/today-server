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
        let {uname,pass} = this.ctx.request.body;
        let user = await this.ctx.model.User.find({uname:uname});
        if(user.length>0){
         return 'none'
        }else{
          user = await this.ctx.model.User.create({
            uname:uname,pass:pass
          });
          if(user.uname&&user.pass){
           return 'success';
          }else{
           return 'error'
          }
        }
      }
   
    }
    return UserService;
  };