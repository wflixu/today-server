// {app_root}/app/controller/user.js
const Controller = require('egg').Controller;




class UserController extends Controller {
  async index() {
    await this.ctx.render('user.hbs',{});
  }

  async sign(){
    const result = await this.ctx.service.user.sign();
    if(result.uname&& result.pass){
      this.ctx.body ='success';
    }else{
      this.ctx.body ='error';
    }
    
  }
  async login(){
    const result = await this.ctx.service.user.login();
    if(result.length==1){
      this.ctx.body ='success';
    }else {
      this.ctx.body ='error';
    }
    this.ctx.status =200;
  }
}

module.exports = UserController;