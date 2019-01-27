const Controller = require('egg').Controller;

class Api extends Controller {
  async api() {
    const dataList = {
      name: 'tsss',
      age: 33
    };
    await this.ctx.body 
  }
}

module.exports = Api;