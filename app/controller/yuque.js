'use strict';

const Controller = require('egg').Controller;

class YuqueController extends Controller {
  async index() {
     var token  = this.config.yuque.token;
     var testsevice = await this.ctx.service.yuque.getData();
     this.ctx.body = JSON.stringify(testsevice);
  }
}

module.exports = YuqueController;
