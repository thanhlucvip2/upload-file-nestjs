import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '30042000',
      database: 'cheekawai',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    MulterModule.register({ dest: './uploads' }),
    UploadFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
