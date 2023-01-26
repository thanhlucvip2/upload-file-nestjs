import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { UploadFileEntity } from './upload-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFileEntity])],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
