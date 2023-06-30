import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Sms } from '../entity/Sms';
import { veriflyCodeFailureTime } from '../utils/constent';
import { User } from '../entity/User';

@Provide()
export class AuthService {
  @InjectEntityModel(Sms)
  smsModel: Repository<Sms>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async codeCount(ip: string) {
    return this.smsModel.countBy({
      ip,
    });
  }
  async activingCode(phone: string) {
    const list = await this.smsModel.findBy({
      phone,
    });
    const res = list.find(item => {
      return (
        Date.now() - new Date(item.createdAt).getTime() < veriflyCodeFailureTime
      );
    });
    return res;
  }
  async addPhoneCode(phone: string, code: number, ip: string) {
    return this.smsModel.save({ phone, code, ip });
  }

  async veriflyPhoneCode(phone: string, code: number) {
    const record = await this.smsModel.findBy({
      phone,
      code,
      createdAt: Raw(alias => `${alias} > :timestamp`, {
        timestamp: new Date(Date.now() - veriflyCodeFailureTime),
      }),
    });
    console.log(record);
    return !!record.length;
  }

  async loginByPassword(name: string, password: string) {
    return this.userModel.findOneBy({
      name,
      password,
    });
  }

  async login() {}
}
