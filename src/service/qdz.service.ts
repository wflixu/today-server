import { Provide } from '@midwayjs/core';
import { Post } from '../entity/Post';
import { In, Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { QLocation } from '../entity/QLocation';
import { INPost } from '../interface';
import { User } from '../entity/User';
import { Participant } from '../entity/Participant';

@Provide()
export class QDZService {
  @InjectEntityModel(Post)
  postModel: Repository<Post>;

  @InjectEntityModel(QLocation)
  qlocationModel: Repository<QLocation>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Participant)
  participantModel: Repository<Participant>;

  async list() {
    const posts = await this.postModel.find({
      relations: ['location'],
    });

    return posts;
  }
  async locationList() {
    return this.qlocationModel.find();
  }

  async addParticipant(post_id: number, user_id: number, message: string) {
    const post = await this.postModel.findOne({
      where: {
        post_id,
      },
    });
    if (!post) {
      return null;
    }

    const user = await this.userModel.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return null;
    }

    const participant = this.participantModel.create({
      message,
    } as Partial<Participant>);
    participant.post = post;
    participant.user = user;
    return this.participantModel.save(participant);
  }

  async getPostParticipants(post_id: number) {
    return this.participantModel.find({
      where: {
        post_id,
      },
      relations: ['user'],
    });
  }

  async delParticipant(id: number) {
    return this.participantModel.delete(id);
  }

  async addPost(pr: INPost, userId: number) {
    const local = await this.qlocationModel.findOne({
      where: {
        location_id: pr.location_id,
      },
    });
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!local || !user) {
      return null;
    }
    const new_post = this.postModel.create({
      ...pr,
      user_id: userId,
      event_time: new Date(pr.event_time),
      update_at: new Date(),
      created_at: new Date(),
      location: local,
      user: user,
    } as Partial<Post>);
    return this.postModel.save(new_post);
  }

  async deletePost(post_id: number) {
    return this.postModel.delete(post_id);
  }

  async updatePost(pr: INPost & { post_id: number }) {
    const curPost = await this.postModel.findOne({
      where: {
        post_id: pr.post_id,
      },
    });
    if (!curPost) {
      return null;
    }
    Object.assign(curPost, pr);
    if (pr.location_id) {
      curPost.location = await this.qlocationModel.findOneBy({
        location_id: pr.location_id,
      });
    }

    if (pr.event_time) {
      curPost.event_time = new Date(pr.event_time);
    }

    curPost.update_at = new Date(); // update_at

    return this.postModel.save(curPost);
  }

  async addLocal(pr: Partial<QLocation>) {
    const local = this.qlocationModel.create({
      ...pr,
    } as Partial<QLocation>);
    return this.qlocationModel.save(local);
  }
}
