# today-server

基于Egg.js的 RESTful API 服务，用于快速集成开发RESTful前后端分离的服务端。 (建议用于学习入门EGGJS和Mongoose,如果作为生产请自行优化和改造)

前台使用vite TypeScript vue3 ant-design-vue

## 特性
- ⚡ 框架选择：基于 Egg.js 2.0 
- 🔥 数据模型：基于 Mongoose 存储
- 🔒 授权验证：基于JWT
- 🚀 内置功能：文件处理，用户系统，统一错误处理及接口返回标准，全方位CRUD,分页,模糊查询的等数据操作
## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.


## Development

```bash
$ npm i
# 启动后台
$ npm run dev 
# 启动前台
$ npm run dev:vite 
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org