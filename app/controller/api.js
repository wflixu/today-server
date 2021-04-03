'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async user() {
    const { ctx } = this;
    ctx.body = 'hello egg.js';
    console.log(ctx.model);
  }
}

module.exports = HomeController;

