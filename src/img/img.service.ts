import {
  Injectable,
  //BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entitiy';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { fileNamer } from 'src/common/helper';
import * as multer from 'multer';
import { FileUpload } from 'src/common/interfaces/file-upload';
import { uploadImgFile } from 'src/common/helper/upload-file';

@Injectable()
export class ImgService {
  constructor(
    // ? Patron Repositorio
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async uploadFile(datos: any) {
    const { id, coleccion, image } = datos;
    const archivo = image as FileUpload;
    const nombre = await uploadImgFile(archivo, coleccion);
    console.log(nombre);

    return { message: 'File uploaded successfully' };
  }
}
