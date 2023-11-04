import {
  BadRequestException,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ImgService } from './img.service';
import { ImgMSG } from 'src/common/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/common/helper';
import { diskStorage } from 'multer';

@Controller()
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @MessagePattern(ImgMSG.GET_IMAGE)
  async getFle(@Payload() payload: any) {
    //return this.imgService.create(createImgDto);
    return 'retornar el url de la imagen';
  }

  @MessagePattern(ImgMSG.UPDATE)
  async uploadFile(@Payload() payload: any) {
    const datos = {
      id: payload.id,
      coleccion: payload.coleccion,
      image: payload.image,
    };
    //console.log(data);
    //return data;
    return this.imgService.uploadFile(datos);
  }
}
