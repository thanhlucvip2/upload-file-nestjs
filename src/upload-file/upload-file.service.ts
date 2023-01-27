import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFileEntity } from './upload-file.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { serverEnv } from 'src/env.const';
import { unlinkSync } from 'fs';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
  ) {}

  async getAllImage() {
    return await this.uploadFileRepository.find();
  }
  async getOneImage(id: string) {
    const image = await this.uploadFileRepository.findOne({ where: { id } });
    if (!image) {
      throw new HttpException(
        'Image không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    return image;
  }

  async saveFile(file: Express.Multer.File) {
    const sizeMB = (file.size / 1024 ** 2).toFixed(2);

    const dataFile = {
      typeFile: file.fieldname,
      size: `${sizeMB} MB`,
      fileName: file.originalname,
      fileId: file.filename,
      urlFile: `/api/upload/img/${file.filename}`,
    };
    const newFileDB = await this.uploadFileRepository.create(dataFile);
    await this.uploadFileRepository.save(newFileDB);
    return newFileDB;
  }

  async delete(id) {
    const image = await this.uploadFileRepository.findOne({ where: { id } });
    if (!image) {
      throw new HttpException(
        'Image không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    unlinkSync(`./uploads/${image.fileId}`);
    await this.uploadFileRepository.delete({ id });
    return 'Xóa thành công!';
  }

  async updateFile(id: string, fileName: string) {
    if (!fileName) {
      throw new HttpException(
        'Vui lòng điền đủ thông tin',
        HttpStatus.BAD_REQUEST,
      );
    }
    const image = await this.uploadFileRepository.findOne({ where: { id } });
    if (!image) {
      throw new HttpException(
        'Image không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.uploadFileRepository.update({ id }, { ...image, fileName });
    return await this.uploadFileRepository.findOne({ where: { id } });
  }
}
