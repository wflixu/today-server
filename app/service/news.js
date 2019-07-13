
const Service = require('egg').Service;

class NewsService extends Service {
  async index() {
    this.ctx.body ="news"
  }
}

module.exports = NewsService;
