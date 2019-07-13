'use strict';

const Service = require('egg').Service;

class YuqueService extends Service {


    async getData(url, method) {
        const { data } = await this.ctx.curl(url, {
            data: {},
            method:method,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "today-app",
                "X-Auth-Token": "7ZmBQzOgGAv62sHWmgtKxBn5mC3JFfxteKBLRNrI"
            },
            dataType: 'json',
        });

        return data;

    }
}

module.exports = YuqueService;
