import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir, homedir } from 'node:os';
import { join } from 'node:path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1681179064355_5949',
  koa: {
    port: 8443,
    // globalPrefix: '/api',
  },
  cors: {
    credentials: false,
  },
  jwt: {
    // secret: readFileSync('/Users/lixu/dev/wflixu.cn_nginx/wflixu.cn.key'), // fs.readFileSync('xxxxx.key')
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d',
  },
  passport: {
    session: false,
  },
  jwtPassport: {
    ignore: [
      '/passport/login',
      '/passport/sms',
      '/passport/sign',
      '/chunk/show',
      '/chunk/down',
      '/foo',
      '/bar',
    ],
  },
  tencentCloudSms: {
    secretId: process.env.secretId,
    secretKey: process.env.secretKey,
    region: 'ap-beijing',
    SmsSdkAppId: '1400812827',
    TemplateId: '1774293',
    SignName: '行途于心的小站',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'today',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: true,
        entities: ['**/entity/*{.ts,.js}'],
      },
    },
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => true),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/chunk\/upload/,
  },
  resultFormat: {
    ignore: ['/chunk/show', '/chunk/down'],
  },
} as MidwayConfig;
