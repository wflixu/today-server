import { Provide } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async addUser(user: User) {
    const n = await this.userModel.save(user);
    return n;
  }
  async findUserById(userId: string) {
    const u = await this.userModel.findOne({ where: { id: userId } });
    return u;
  }
  async updateUser() {
    // this.userModel.update()
  }
  async removeUser(user: User) {
    return this.userModel.remove(user);
  }
}
