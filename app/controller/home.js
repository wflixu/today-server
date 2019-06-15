const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
   const dataList = {};
    await this.ctx.render('home.hbs', dataList);
  }
}

module.exports = HomeController;