import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entitiy';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import { FileUpload } from 'src/common/interfaces/file-upload';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImgService {
  constructor(
    // ? Patron Repositorio
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  getStaticFile(imageName: string, coleccion: string) {
    const path = join(__dirname, `../../static/${coleccion}`, imageName);
    if (!fs.existsSync(path)) {
      throw new BadRequestException(
        `No ${coleccion} found with image: ${imageName}`,
      );
    }
    return path;
  }

  async uploadFile(datos: {
    id: string;
    coleccion: string;
    image: FileUpload;
  }) {
    const { id, coleccion, image } = datos;

    let modelo;
    let data;

    switch (coleccion) {
      case 'user':
        modelo = await this.userModel.findById(id).select('-password');
        data = this.userModel;
        //console.log(modelo);
        if (!modelo) {
          throw new NotFoundException(
            `usuario con el id: ${id} no estan en la bd`,
          );
        }
        break;

      case 'product':
        modelo = await this.productModel.findById(id);
        data = this.productModel;
        //console.log(modelo);
        if (!modelo) {
          throw new NotFoundException(
            `producto con el id: ${id} no estan en la bd`,
          );
        }
        break;

      default:
        return {
          msg: 'Se me olvido validar esto!!!',
        };
    }

    //* borramos la imagen que estanba en el filesystem
    if (modelo.img) {
      const folderPath = join(__dirname, '../../static', coleccion, modelo.img);
      //console.log(folderPath);
      if (fs.existsSync(folderPath)) {
        fs.unlinkSync(folderPath);
      }
    }
    const nombreCortado = image.originalname.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    const nombreDefinitivo = uuidv4() + '.' + extension;
    const folderPath = join(__dirname, '../../static', coleccion);
    //console.log(folderPath);
    // Verifica que la carpeta de destino exista, si no, créala

    // * Guarda la imagen en el filesystem
    const filePath = join(folderPath, nombreDefinitivo);

    //fs.writeFileSync(filePath, image.buffer);
    fs.writeFileSync(filePath, Buffer.from(image.buffer));

    const resp = await data.findByIdAndUpdate(
      id,
      { img: nombreDefinitivo },
      { new: true },
    );

    return resp;
  }
}
