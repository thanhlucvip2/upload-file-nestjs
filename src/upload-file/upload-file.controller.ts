import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Delete,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadFileService } from './upload-file.service';

@Controller('upload')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}
  @Get()
  async getfile() {
    return this.uploadFileService.getAllImage();
  }
  @Get(':id')
  async getOneFile(@Param('id') id: string) {
    return this.uploadFileService.getOneImage(id);
  }

  @Get('/img/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    res.sendFile(`./uploads/${id}`, { root: '.' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async handleUpload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.saveFile(file);
  }

  @Delete(':id')
  deleteFile(@Param('id') id: string) {
    return this.uploadFileService.delete(id);
  }

  @Put(':id')
  upadateImage(@Param('id') id: string, @Body('fileName') fileName: string) {
    return this.uploadFileService.updateFile(id, fileName);
  }
}
