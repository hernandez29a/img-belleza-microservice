import {
  Injectable,
  //BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entitiy';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { fileNamer } from 'src/common/helper';
import * as multer from 'multer';
import { FileUpload } from 'src/common/interfaces/file-upload';
import { uploadImgFile } from 'src/common/helper/upload-file';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class ImgService {
  constructor(
    // ? Patron Repositorio
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async uploadFile(datos: {
    id: string;
    coleccion: string;
    image: FileUpload;
  }) {
    const { id, coleccion, image } = datos;
    // Verifica que la carpeta de destino exista, si no, créala
    const nombreCortado = image.originalname.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    const nombreTemporal = uuidv4() + '.' + extension;
    const folderPath = join(__dirname, '../../static', coleccion);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Guarda la imagen en el filesystem
    const filePath = join(folderPath, nombreTemporal);
    //fs.writeFileSync(filePath, image.buffer);
    fs.writeFileSync(filePath, Buffer.from(image.buffer));

    return nombreTemporal;
  }
}
