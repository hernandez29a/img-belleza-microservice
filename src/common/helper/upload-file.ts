/* eslint-disable prettier/prettier */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/promise-function-async */
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '../interfaces/file-upload';

export const uploadImgFile = (
  files: FileUpload,
  //extencionesValidas = ['jpg', 'png', 'jpeg', 'gif'],
  carpeta = '',
) => {
  return new Promise((resolve, reject) => {
    const archivo = files;
    const nombreCortado = archivo.originalname.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    //console.log(nombreCortado)
    //console.log(extension)

    // const extencionesValidas = ['jpg', 'png', 'jpeg', 'gif']
    // validar la extension
    /*if (!extencionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida - solo ${extencionesValidas}`,
      );
    }*/
    const nombreTemporal = uuidv4() + '.' + extension;
    //console.log(nombreTemporal);
    const uploadPath = join(
        __dirname,
      '../../static/',
      carpeta,
      nombreTemporal,
      );
    console.log(uploadPath);
    archivo.mv(uploadPath, (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemporal);
    });
  });
};
