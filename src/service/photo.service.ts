/* eslint-disable prefer-const */
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Photo } from '../entity/photo.entity';
import { Repository } from 'typeorm';
import { PhotoMetadata } from '../entity/photoMetadata.entity';

@Provide()
export class PhotoService {
  @InjectEntityModel(Photo)
  photoModel: Repository<Photo>;

  @InjectEntityModel(PhotoMetadata)
  photoMetadataModel: Repository<PhotoMetadata>;

  // save
  async savePhoto() {
    // create a entity object
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    // create a photo metadata
    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portrait';
    metadata.photo = photo; // this way we connect them

    // save entity
    const photoResult = await this.photoModel.save(photo);
    await this.photoMetadataModel.save(metadata);
    // save success
    console.log('photo id = ', photoResult.id);
    return photo;
  }

  // find
  async findPhotos() {
    // find All
    // @ts-ignore
    let allPhotos = await this.photoModel.find({});
    console.log('All photos from the db: ', allPhotos);

    // // find first
    // let firstPhoto = await this.photoModel.findOne({
    //   where: {
    //     id: 1,
    //   },
    // });
    // console.log('First photo from the db: ', firstPhoto);

    // // find one by name
    // let meAndBearsPhoto = await this.photoModel.findOne({
    //   where: { name: 'Me and Bears' },
    // });
    // console.log('Me and Bears photo from the db: ', meAndBearsPhoto);

    // // find by views
    // let allViewedPhotos = await this.photoModel.find({
    //   where: { views: 1 },
    // });
    // console.log('All viewed photos: ', allViewedPhotos);

    // let allPublishedPhotos = await this.photoModel.find({
    //   where: { isPublished: true },
    // });
    // console.log('All published photos: ', allPublishedPhotos);

    // // find and get count
    // // @ts-ignore
    // let [allPhotos, photosCount] = await this.photoModel.findAndCount({});
    // console.log('All photos: ', allPhotos);
    // console.log('Photos count: ', photosCount);
  }

  async updatePhoto() {
    let photoToUpdate = await this.photoModel.findOne({
      where: {
        id: 1,
      },
    });
    photoToUpdate.name = 'Me, my friends and polar bears';

    await this.photoModel.save(photoToUpdate);
  }
  async deletePhoto(id: number) {
    // 按 id 删除
    await this.photoModel.delete(id);
    //    await this.photoModel.delete([1, 2, 3]);
  }
}
