import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ImgModule } from './img/img.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    ImgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
