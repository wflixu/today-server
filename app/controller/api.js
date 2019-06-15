const Controller = require('egg').Controller;

class Api extends Controller {

  async user() {
    const { data: resData } = await this.ctx.curl(`https://www.yuque.com/api/v2/user`, {
      data: {
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "today-app",
        "X-Auth-Token": "7ZmBQzOgGAv62sHWmgtKxBn5mC3JFfxteKBLRNrI"
      },
      dataType: 'json',
    });
    console.log(resData);
    
   this.ctx.body = JSON.stringify(resData)
   
  }
  async users() {
    let {count} = this.ctx.params;
    const { data: resData } = await this.ctx.curl(`https://www.yuque.com/api/v2/users/${count}`, {
      data: {
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "today-app",
        "X-Auth-Token": "7ZmBQzOgGAv62sHWmgtKxBn5mC3JFfxteKBLRNrI"
      },
      dataType: 'json',
    });
    console.log(resData);
    
   this.ctx.body = JSON.stringify(resData)
   
  }
  async getUserRepos() {
    let {count}  = this.ctx.params;
    let path = `https://www.yuque.com/api/v2/users/${count}/repos`;
    const data = await this.service.yuque.getData(path,'GET'); 
    this.ctx.body = JSON.stringify(data);
  }

  async getRepoDetail(){
    let {id} = this.ctx.params;
    let path = `https://www.yuque.com/api/v2/repos/${id}`;
    const data = await this.service.yuque.getData(path,'GET'); 
    this.ctx.body = JSON.stringify(data);

  }
  async getRepoDocsList (){
    let {id} = this.ctx.params;
    let path = `https://www.yuque.com/api/v2/repos/${id}/docs`;
    const data = await this.service.yuque.getData(path,'GET'); 
    this.ctx.body = JSON.stringify(data);
  }

  async getDocsDetail(){
    let {repo_id,id} = this.ctx.params;
    let path = `https://www.yuque.com/api/v2/repos/${repo_id}/docs/${id}`;
    const data = await this.service.yuque.getData(path,'GET'); 
    this.ctx.body = JSON.stringify(data);
  }
}

module.exports = Api;