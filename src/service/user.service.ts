import { Provide } from '@midwayjs/core';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async list() {
    return this.userModel.find();
  }

  async addUser(user: User) {
    const n = await this.userModel.save(user);
    return n;
  }
  async findUserById(userId: number) {
    const u = await this.userModel.findOne({ where: { id: userId } });
    return u;
  }

  async hasUser(phone: string, name: string) {
    return this.userModel.findOneBy([
      {
        phone,
      },
      {
        name,
      },
    ]);
  }

  
  
  async updateUser() {
    // this.userModel.update()
  }
  async removeUser(user: User) {
    return this.userModel.remove(user);
  }
}
