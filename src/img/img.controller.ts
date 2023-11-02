import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ImgService } from './img.service';
import { CreateImgDto } from './dto/create-img.dto';
import { ImgMSG } from 'src/common/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/common/helper';
import { diskStorage } from 'multer';

@Controller()
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @MessagePattern(ImgMSG.GET_IMAGE)
  async getFle(@Payload() payload: any) {
    console.log(payload);
    //return this.imgService.create(createImgDto);
    return 'retornar el url de la imagen';
  }

  //@MessagePattern(ImgMSG.UPDATE)
  /*@UseInterceptors(
    FileInterceptor('image', {
      //fileFilter: fileFilter,
      //limits: { fileSize: 1000000 },
      /*storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, `./uploads/${req.params.coleccion}`);
        },
        filename: fileNamer,
      }),
    }),
  )*/
  async uploadUserFile(@Payload() payload: any) {
    console.log(payload);
    return 'la imagen se guardo entro del microservicio';
    //return this.imgService.findAll();
  }
}
