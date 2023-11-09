/* eslint-disable prettier/prettier */
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
import { FileUpload } from 'src/common/interfaces/file-upload';

@Controller()
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @MessagePattern(ImgMSG.GET_IMAGE)
  async getFle(@Payload() payload: any) {
    //return this.imgService.create(createImgDto);
    return 'retornar el url de la imagen';
  }

  @MessagePattern(ImgMSG.UPDATE)
  async uploadFile(@Payload() payload: {id: string, coleccion: string, image: FileUpload }) {
    const datos = {
      id: payload.id,
      coleccion: payload.coleccion,
      image: payload.image,
    };
    //console.log(data);
    //return datos;
    return this.imgService.uploadFile(datos);
  }
}
