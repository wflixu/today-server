const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const dataList = {
            list: [
                { id: 1, title: 'this is news 1', url: '/news/1' },
                { id: 2, title: 'this is news 2', url: '/news/2' }
            ]
        };

        // this.ctx.body= 'new ';
        await this.ctx.render('news/list', dataList);
    }
    async content(){
        // var id = this.ctx.query.id;
       let id = this.ctx.params.id;
        this.ctx.body=`新闻详情 id: ${id}`;
    }
}

module.exports = NewsController;