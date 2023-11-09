/* eslint-disable prettier/prettier */
import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ImgService } from './img.service';
import { ImgMSG } from 'src/common/constants';
import { FileUpload } from 'src/common/interfaces/file-upload';

@Controller()
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @MessagePattern(ImgMSG.GET_IMAGE)
  async getImage(@Payload() payload: {imageName: string, coleccion: string}) {
    //console.log(payload.coleccion, payload.imageName)
    //return this.imgService.create(createImgDto);
    //return 'retornar el url de la imagen';
    const path = this.imgService.getStaticFile(payload.imageName, payload.coleccion);
    //console.log(path);
    return path;
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
