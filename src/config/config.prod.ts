import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: '1639994056460_8009',
  koa: {
    port: 8443,
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
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
