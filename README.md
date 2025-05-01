# Today-server

midway.js

主要技术栈为：

| 名称                | 版本  | 名称       | 版本  |
| ------------------- | ----- | ---------- | ----- |
| midway.js           | 3.0.x | TypeScript | 4.8.x |
| postgresql          | 14.x  | typeorm    | 0.3.x |
| node                | 18.x  |            |       |
| 详见 `package.json` | 😁    | 🥰         | 🤗    |

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm run build
$  npm start

pm2 start ./bootstrap.js --name today_server

$ pm2 start     # 启动一个服务
$ pm2 list      # 列出当前的服务
$ pm2 stop          # 停止某个服务
$ pm2 restart       # 重启某个服务
$ pm2 delete        # 删除某个服务
$ pm2 logs          # 查看服务的输出日志


```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[midway]: https://midwayjs.org




