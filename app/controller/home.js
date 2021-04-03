'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hello egg.js';
    await ctx.render('home',{
      keywords:'react view template',
      description:'alsdjfkj laksjdkf jaklsdjf ',
      title:'home'
    });
    ctx.status = 200;
  }
}

module.exports = HomeController;

