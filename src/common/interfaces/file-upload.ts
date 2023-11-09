/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: number;
  mimetype: string;
  buffer: Buffer;
  size: 0,
  destination: '',
  filename: '',
  path: ''
  mv: Function;
}