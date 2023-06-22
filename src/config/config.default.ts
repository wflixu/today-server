import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1681179064355_5949',
  koa: {
    port: 8443,
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
    ignore: ['/passport/login', '/passport/sms', 'passport/sign'],
  },
  tencentCloudSms: {
    secretId: '',
    secretKey: '',
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
        logging: false,
        entities: ['**/entity/*{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
