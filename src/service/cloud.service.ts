import {
  Config,
  ILogger,
  Init,
  Inject,
  Provide,
  Singleton,
} from '@midwayjs/core';

import { Context } from '@midwayjs/koa';
import { Client } from 'tencentcloud-sdk-nodejs-sms/tencentcloud/services/sms/v20210111/sms_client';

@Provide()
@Singleton()
export class CloudService {
  @Inject()
  logger: ILogger;

  @Inject()
  ctx: Context;

  smsClient: Client = null;

  @Config('tencentCloudSMS')
  tencentCloudConfig: Record<string, any>;

  @Init()
  init() {
    this.logger.info(this.tencentCloudConfig);
    // @ts-ignore
    this.smsClient = new Client({
      credential: {
        secretId: this.tencentCloudConfig.secretId,
        secretKey: this.tencentCloudConfig.secretKey,
      },
      region: 'ap-guangzhou',

      profile: {
        signMethod: 'HmacSHA256',
        httpProfile: {
          reqMethod: 'POST',

          reqTimeout: 30,

          endpoint: 'sms.tencentcloudapi.com',
        },
      },
    });
  }

  async sendSMS(phone: string, code: string) {
    if (!this.smsClient || !this.tencentCloudConfig) {
      return;
    }
    const params = {
      SmsSdkAppId: '1400812827',
      SignName: '行途于心的小站',
      /* 模板 ID: 必须填写已审核通过的模板 ID */
      // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
      TemplateId: '1774293',
      /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
      TemplateParamSet: [code],
      /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
       * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
      PhoneNumberSet: ['+86' + phone],
    };
    return this.smsClient.SendSms(params);
  }
}
