import { Injectable, UploadedFile,HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';
import { PrismaService } from '../db-connections/prisma.service';
import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs-extra';
import * as path from 'path';

import { join } from 'path';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import{ValidCharge} from '../shared/TypeCharge.interface'

import * as QRCode from 'qrcode';
const JsBarcode = require('jsbarcode');
import * as CryptoJS from 'crypto-js';
import {CarnetsUtils} from './carnets.utils'
import {CarnetsImage} from './carnets.image'
 

@Injectable()
export class CarnetsService {
private readonly uploadPath = join(__dirname, '..', '..', 'tmp');
//qrurl:string = "http://carnet.ciip.com.ve/carnet/ficha"
qrurl:string = process.env.QRURL;

  constructor(
    private prisma: PrismaService,
    private utils: CarnetsUtils,
    private image: CarnetsImage,
    ) {}

  async getBarcode(id:string) { 
    try{
        const carnet = await this.prisma.carnets.findFirst({
            where: {
                    card_code: id
            }
        });
        if(carnet)return { status: HttpStatus.OK, data: [carnet] }
        return { status: HttpStatus.NOT_FOUND }
    } catch (error) {
        throw new HttpException('Error findOne carnet', HttpStatus.NOT_FOUND);
    }
  }



async getall(limit: number, page: number){
  const [total, carnets] = await Promise.all([
      this.prisma.carnets.count({ 
          where: {
              charge: {
                    NOT: {
                        name: {
                            in: ['ASESOR', 'VISITANTE']
                        }
                    }
                },
              status: {
                  id: 1 // Suponiendo que el campo `status` en `Carnets` es un objeto relacionado y tiene un campo `id`
              }
          },

       }),

      this.prisma.carnets.findMany({
           where: {
              charge: {
                    NOT: {
                        name: {
                            in: ['ASESOR', 'VISITANTE']
                        }
                    }
                },
              status: {
                  id: 1 // Suponiendo que el campo `status` en `Carnets` es un objeto relacionado y tiene un campo `id`
              }
          },
          include: {
              department: true,
              charge: true,
              access_levels: true,
              state: true,
              status: true
          },
          skip: (page - 1) * limit,
          take: limit,
      })
  ]);

  const lastPage = Math.ceil(total / limit);

  return {
      total,
      lastPage,
      page,
      carnets,
  };
}
async getFilter(filter: number, limit: number, page: number){
  const [total, carnets] = await Promise.all([
      this.prisma.carnets.count({ 
          where: {
              charge: {
                  id: Number(filter)
              },
              status: {
                  id: 1 // Suponiendo que el campo `status` en `Carnets` es un objeto relacionado y tiene un campo `id`
              }
          },

       }),

      this.prisma.carnets.findMany({
           where: {
              charge: {
                  id: Number(filter)
              },
              status: {
                  id: 1 // Suponiendo que el campo `status` en `Carnets` es un objeto relacionado y tiene un campo `id`
              }
          },
          include: {
              department: true,
              charge: true,
              access_levels: true,
              state: true,
              status: true
          },
          skip: (page - 1) * limit,
          take: limit,
      })
  ]);

  const lastPage = Math.ceil(total / limit);

  return {
      total,
      lastPage,
      page,
      carnets,
  };
}

async getFilterCarnets(filter: number, limit: number, page: number) {
    const status = 1;
    if(Number(filter)===0){//traeme todo
        return await this.getall(limit,page);
    }else{
        return await this.getFilter(filter,limit,page);
    }

    
}




  async getCarnets(status: number,limit: number,page: number){
        const [total, carnets] = await Promise.all([
                this.prisma.carnets.count({ where: { id_status:Number(status)}}),

                this.prisma.carnets.findMany({
                    where: { id_status:Number(status) },
                    include: {
                        department:true,
                        charge:true,
                        access_levels:true,
                        state:true,
                        status:true
                    },
                    skip: (page -1 )* limit,
                    take: limit,
                })
            ]);

            const lastPage = Math.ceil(total / limit);

            return {
                total,
                lastPage,
                page,
                carnets,
            };
  }
 



  getFilePath(filename: string): string {
    const filePath = path.join(__dirname, '..','..', 'uploads',filename, filename);

    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    return filePath;
  }

  getFilePath2(filename: string): string {
    const filePath = path.join(__dirname, '..','..', 'uploads',filename, filename+"-2");

    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    return filePath;
  }
/*
 encryptNumericString(text: string): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    let index = parseInt(char, 10);

    // Ensure we have a valid index
    if (!isNaN(index) && index >= 0 && index <= 9) {
      result += characters[index];
    } else {
      result += char; // Handle non-numeric characters
    }
  }

  return result;
}


 decryptNumericString(text: string): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    let index = characters.indexOf(char);

    // Ensure we have a valid character
    if (index >= 0 && index <= 9) {
      result += index.toString();
    } else {
      result += char; // Handle non-encrypted characters
    }
  }

  return result;
}*/


  async fileUpload(file: Express.Multer.File, cedule: string) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = extname(file.originalname);
    const filename = cedule;//`${uniqueSuffix}${ext}`;
    const filePath = join(this.uploadPath, filename);
    try {
      // Asegúrate de que la carpeta de destino existe
      await fs.ensureDir(this.uploadPath);
      // Guarda el archivo
      await fs.writeFile(filePath, file.buffer);

      console.log(`File saved with name: ${filename} for cedule: ${cedule}`);

      const person = await this.getProfile(cedule);
      if(!person) throw new HttpException('No existe el perfil', 500);

      await this.utils.generateBarcode(person.card_code, filename);
      await this.utils.generateQrCode(this.qrurl+"?id="+this.utils.encryptNumericString(cedule),filename);
      await this.makeCarnet(filename,cedule);
      await this.makeCarnet2(filename,cedule);
      //await fs.emptyDir(this.uploadPath);
      return { message: 'File uploaded successfully', filename, cedule };
    } catch (error) {
      console.error('Error saving file:', error);
      await this.remove(cedule);
      throw new HttpException('Error saving file', 500);//throw new Error('File upload failed');
    }
  }


  private async getProfile(id:string) {
    try{
        const carnet = await this.prisma.carnets.findFirst({
            where: {
                    cedule: id
            },
            include: {
              department:true,
              charge:true,
            }
        });
        return carnet;
    } catch (error) {
        throw new HttpException('Error findOne carnet', HttpStatus.NOT_FOUND);
    }
  }
/*/
formatCedula(cedula: string) {
  if (!/^\d+$/.test(cedula)) {
    throw new Error("Input must be a valid number string.");
  }
  // Convertir el string a número entero
  let num = parseInt(cedula, 10);
  // Convertir el número a string con puntos como separadores de miles
  return "V-"+num.toLocaleString('de-DE');

}
*/
 

async makeCarnet2(file: string, cedule: string) {
  let fondo: string = 'CARNET-CIIP-MORADO.2.jpg';
  const canvasWidth = 918; // Ancho del lienzo
  const canvasHeight = 1446; // Alto del lienzo
  let cargo:string = "";


  const person = await this.getProfile(cedule);
  if(!person) throw new HttpException('No existe el perfil', 500);
  
  cargo= person.charge.name;
  fondo = this.utils.getImageBack(cargo);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  console.log("makeCarnet2: ",file)
  // Cargar la imagen de fondo del carnet
  const imagePath = path.join(__dirname, '..', '..', 'image', fondo);
  const carnetImage = await loadImage(imagePath);
  ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);

  // Cargar la imagen QR
  const qrImagePath = path.join(__dirname, '..', '..', 'qr', file+".png");
  const qrImage = await loadImage(qrImagePath);

  // Cargar la imagen del código de barras
  const barcodeImagePath = path.join(__dirname, '..', '..', 'barcodes', file+".png");
  const barcodeImage = await loadImage(barcodeImagePath);

  // Dibujar la imagen QR con esquinas redondeadas
  const qrWidth = 250;
  const qrHeight = 250;
  const qrX = ((canvasWidth - qrWidth) / 2)+220;
  const qrY = ((canvasHeight - qrHeight) / 2) + 420;
  const qrRadius = 60;

  await this.image.drawRoundedImage(ctx, qrImage, qrX, qrY, qrWidth, qrHeight, qrRadius);

  // Dibujar la imagen del código de barras
  const barcodeWidth = 450;
  const barcodeHeight = 150;
  const barcodeX = ((canvasWidth - barcodeWidth) / 2)+220;
  const barcodeY = canvasHeight - barcodeHeight - 15;

  ctx.drawImage(barcodeImage, barcodeX, barcodeY, barcodeWidth, barcodeHeight);

  // Guardar la imagen resultante
  //const outputFilePath = path.join(__dirname, '..', '..', 'uploads/'+cedule, file);
  const outputDir = path.join(__dirname, '..', '..', 'uploads', cedule);
  const outputFilePath = path.join(outputDir, file+"-2");
  try {
    await fs.ensureDir(outputDir);
    const out = fs.createWriteStream(outputFilePath);
    const stream = canvas.createJPEGStream({ quality: 0.8 });
    stream.pipe(out);
    await new Promise<void>((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
    console.log(`Imagen guardada en ${outputFilePath}`);
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    throw new Error('Error al guardar la imagen (qr,barcode)');
  }

  return { outputFilePath };
}


async makeCarnet(file:string,cedule: string){
    let nombre:string = "";
    let cedula:string = "";
    let departamento:string="";
    let cargo:string = "";
    let fondo:string='CARNET-CIIP-MORADO.1.jpg';

    const person = await this.getProfile(cedule);
    if(!person) throw new HttpException('No existe el perfil', 500);

    nombre = person.name + " " + person.lastname;
    cedula = cedule;
    departamento = person.department.name;
    cargo= person.charge.name;
    fondo = this.utils.getImageFront(cargo);

    const canvasWidth = 1080;//319*2; // Ancho del lienzo
    const canvasHeight = 1701;//502*2; // Alto del lienzo
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Cargar la imagen de carnet
    const imagePath = path.join(__dirname, '..', '..', 'image', fondo);
    const carnetImage = await loadImage(imagePath);

    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);
    
    //Cargar la imagen que quieres superponer en el centro
    const overlayImagePath = path.join(__dirname, '..', '..', 'tmp', file);
    const overlayImage = await loadImage(overlayImagePath);
    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);

    const overlayWidth = (canvasWidth/2)-140;//400;
    const overlayHeight = (canvasHeight/3)-46;//521;

    //Calcular las coordenadas para centrar la imagen superpuesta
    const overlayX = (canvasWidth - overlayImage.width) /2;
    const overlayY = (canvasHeight - overlayImage.height) /3;

    const xx = (canvasWidth - overlayWidth) / 2;
    const yy = (canvasHeight - overlayHeight) / 2;
    const radius = 60; // Ajusta el radio de las esquinas redondeadas

    await this.image.drawRoundedImage(ctx, overlayImage, xx-3, yy-191, overlayWidth, overlayHeight, radius);
    // Superponer la imagen en el centro del lienzo
    // ctx.drawImage(overlayImage, overlayX-91, overlayY-70,overlayWidth, overlayHeight);

    ctx.font = process.env.nfont; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = process.env.ncolor; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    let x:number=nombre.length;
    let medio:number = canvasWidth /2;
    let pos:number=(canvasWidth -x)/2
    ctx.fillText(nombre.toUpperCase(), pos, (canvasHeight/2)+200);  
    
    ctx.font = process.env.cfont; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = process.env.ccolor; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cedula.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(this.utils.formatCedula(cedula), pos, (canvasHeight/2)+280);  

    ctx.font = process.env.dfont; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = process.env.dcolor; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=departamento.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    //ctx.fillText(departamento.toUpperCase(), pos, (canvasHeight/2)+390);

    const lineHeight = 60; // Ajusta según sea necesario
    const words = departamento.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > (canvasWidth-30) && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
     } else {
     line = testLine;
     }
   }
   lines.push(line);

   for (let i = 0; i < lines.length; i++) {
       ctx.fillText(lines[i].trim(), pos, ((canvasHeight/2)+390) + i * lineHeight);
   }

    ctx.font = process.env.cafont; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = process.env.cacolor; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cargo.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(cargo, pos, (canvasHeight/2)+570); 

     const outputDir = path.join(__dirname, '..', '..', 'uploads', cedule);
     const outputFilePath = path.join(outputDir, `${file}`);
     
     try{
      await fs.ensureDir(outputDir);
      const out = fs.createWriteStream(outputFilePath);
      const stream = canvas.createJPEGStream({ quality: 200 });
      stream.pipe(out);
      out.on('finish', () => console.log(`Imagen guardada en ${outputFilePath}`));
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw new Error('Error al guardar la imagen(foto)');
      }
      return { outputFilePath };
   }

 





async makeCarnetAsesor2(file: string, cedule: string) {
  let fondo: string = 'ASESOR_NUEVO.2.jpg';
  const canvasWidth = 918; // Ancho del lienzo
  const canvasHeight = 1446; // Alto del lienzo
  let cargo:string = "";


  const person = await this.getProfile(cedule);
  if(!person) throw new HttpException('No existe el perfil', 500);
  
  cargo= person.charge.name;
  fondo = this.utils.getImageBack(cargo);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  console.log("makeCarnet2: ",file)
  // Cargar la imagen de fondo del carnet
  const imagePath = path.join(__dirname, '..', '..', 'image', fondo);
  const carnetImage = await loadImage(imagePath);
  ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);

  // Cargar la imagen QR
  const qrImagePath = path.join(__dirname, '..', '..', 'qr', file+".png");
  const qrImage = await loadImage(qrImagePath);

  // Cargar la imagen del código de barras
  const barcodeImagePath = path.join(__dirname, '..', '..', 'barcodes', file+".png");
  const barcodeImage = await loadImage(barcodeImagePath);

  // Dibujar la imagen QR con esquinas redondeadas
  const qrWidth = 250;
  const qrHeight = 250;
  const qrX = ((canvasWidth - qrWidth) / 2)+220;
  const qrY = ((canvasHeight - qrHeight) / 2) + 420;
  const qrRadius = 60;

  await this.image.drawRoundedImage(ctx, qrImage, qrX, qrY, qrWidth, qrHeight, qrRadius);

  // Dibujar la imagen del código de barras
  const barcodeWidth = 450;
  const barcodeHeight = 150;
  const barcodeX = ((canvasWidth - barcodeWidth) / 2)+220;
  const barcodeY = canvasHeight - barcodeHeight - 15;

  ctx.drawImage(barcodeImage, barcodeX, barcodeY, barcodeWidth, barcodeHeight);

  // Guardar la imagen resultante
  //const outputFilePath = path.join(__dirname, '..', '..', 'uploads/'+cedule, file);
  const outputDir = path.join(__dirname, '..', '..', 'uploads', cedule);
  const outputFilePath = path.join(outputDir, file+"-2");
  try {
    await fs.ensureDir(outputDir);
    const out = fs.createWriteStream(outputFilePath);
    const stream = canvas.createJPEGStream({ quality: 0.8 });
    stream.pipe(out);
    await new Promise<void>((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
    console.log(`Imagen guardada en ${outputFilePath}`);
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    throw new Error('Error al guardar la imagen (qr,barcode)');
  }

  return { outputFilePath };
}
async makeCarnetAsesor(file: string, cedule: string) {
    let cargo: string = "";
    let fondo: string = 'ASESOR_NUEVO.jpg';

    const person = await this.getProfile(cedule);
    if (!person) throw new HttpException('No existe el perfil', 500);

    cargo = person.charge.name;
    fondo = this.utils.getImageFront(cargo);
    const imagePath = path.join(__dirname, '..', '..', 'image', fondo);

    const outputDir = path.join(__dirname, '..', '..', 'uploads', cedule);
    const outputFilePath = path.join(outputDir, file);

    // Crear el directorio de destino si no existe
    await fs.ensureDir(outputDir);

    // Copiar la imagen al directorio de destino
    fs.copyFile(imagePath, outputFilePath, (err) => {
        if (err) {
            console.error('Error al copiar la imagen:', err);
            throw new HttpException('Error al guardar la imagen', 500);
        } else {
            console.log('Imagen guardada exitosamente');
        }
    });
}

/*********************************************************************************************/
  
async createVisitante(createCarnetDto: CreateCarnetDto) {
    
    console.log("createVisitante")
    const { name,
            lastname,
            card_code,
            //expiration,
            cedule,
            //cellpone,
            created_at,
            ...other
          }=createCarnetDto
          
    const {
           department,
           charge,
           type_creations,
           status,
           access_levels,
    }=other;
   

   let exist = await this.prisma.carnets.findFirst({
            where: {
                    cedule: cedule
            }
        });
   if(exist)throw new HttpException('El perfil ya esta registrado', 500);

   exist = await this.prisma.carnets.findFirst({
            where: {
                    card_code: card_code
            }
        });
   if(exist)throw new HttpException('Ya existe un carnet con ese Codigo', 500);

   const carnet = await this.prisma.carnets.create({
          data:{
                name: name,
                lastname: lastname,
                card_code: card_code,
                //expiration: expiration,
                cedule: cedule,
                 
                created_at:created_at,
                department: {
                  connect: { id: department }
                },
                charge: {
                  connect: { id: charge }
                },
                type_creations: {
                   connect: { id: type_creations } 
                },
                status: {
                  connect: { id: status }
                },
                access_levels: {
                  connect: { id: access_levels }
                },
          }
    });
   //crear carnet
   await this.utils.generateBarcode(card_code, cedule);
   await this.utils.generateQrCode(this.qrurl+"?id="+this.utils.encryptNumericString(cedule),cedule);
   await this.makeCarnetAsesor(cedule,cedule);
   await this.makeCarnetAsesor2(cedule,cedule);
   return {
       carnet
   }
  }
 

  async createAsesor(createCarnetDto: CreateCarnetDto) {
    const { name,
            lastname,
            card_code,
            expiration,
            cedule,
            cellpone,
            created_at,
            ...other
          }=createCarnetDto
          
    const {
           department,
           charge,
           type_creations,
           status,
           access_levels,
    }=other;
   

   let exist = await this.prisma.carnets.findFirst({
            where: {
                    cedule: cedule
            }
        });
   if(exist)throw new HttpException('El perfil ya esta registrado', 500);

   exist = await this.prisma.carnets.findFirst({
            where: {
                    card_code: card_code
            }
        });
   if(exist)throw new HttpException('Ya existe un carnet con ese Codigo', 500);

   const carnet = await this.prisma.carnets.create({
          data:{
                name: name,
                lastname: lastname,
                card_code: card_code,
                expiration: expiration,
                cedule: cedule,
                cellpone: cellpone,
                created_at:created_at,
                department: {
                  connect: { id: department }
                },
                charge: {
                  connect: { id: charge }
                },
                type_creations: {
                   connect: { id: type_creations } 
                },
                status: {
                  connect: { id: status }
                },
                access_levels: {
                  connect: { id: access_levels }
                },
          }
    });
   //crear carnet
   await this.utils.generateBarcode(card_code, cedule);
   await this.utils.generateQrCode(this.qrurl+"?id="+this.utils.encryptNumericString(cedule),cedule);
   await this.makeCarnetAsesor(cedule,cedule);
   await this.makeCarnetAsesor2(cedule,cedule);
   return {
       carnet
   }
  }
 
  async create(createCarnetDto: CreateCarnetDto) {
    const { name,
            lastname,
            card_code,
            expiration,
            note,
            cedule,
            //extent,
            address,
            //phone,
            cellpone,
            //photo,
            //qr,
            //municipalities,
            //parishes,
            created_at,
            ...other
          }=createCarnetDto
          
    const {
           department,
           charge,
           type_creations,
           //textures,
           status,
           access_levels,
          // genders,
          // hair_colors,
           state,
          // skin_colors,
          // civil_statuses
    }=other;
   

   let exist = await this.prisma.carnets.findFirst({
            where: {
                    cedule: cedule
            }
        });
   if(exist)throw new HttpException('El perfil ya esta registrado', 500);
    exist = await this.prisma.carnets.findFirst({
            where: {
                    card_code: card_code
            }
        });
   if(exist)throw new HttpException('Ya existe un carnet con ese Codigo', 500);


   const carnet = await this.prisma.carnets.create({
          data:{
                name: name,
                lastname: lastname,
                card_code: card_code,
                expiration: expiration,
                note: note,
                cedule: cedule,
                //extent: extent,
                address: address,
               // phone: phone,
                cellpone: cellpone,
                //photo: photo,
               // qr: qr,
               // municipalities:municipalities,
               // parishes:parishes,
                created_at:created_at,
                department: {
                  connect: { id: department }
                },
                charge: {
                  connect: { id: charge }
                },
                type_creations: {
                    //create:{
                      //name: type_creations
                    //}
                   connect: { id: type_creations } 
                },
                //textures: {
                //  connect: { id: textures }
               // },
                status: {
                  connect: { id: status }
                },
                access_levels: {
                  connect: { id: access_levels }
                },
                /*genders: {
                  connect: { id: genders }
                },
                hair_colors: {
                  connect: { id: hair_colors }
                },
                skin_colors: {
                  connect: { id: skin_colors }
                },*/
                state: {
                  connect: { id: state }
                },
                /*civil_statuses: {
                  connect: { id: civil_statuses }
                },*/
          }
    });

   return {
       carnet
   }
  }

  async findAll() {
      const carnet = await this.prisma.carnets.findMany({
        /*include: {
          type_creations:true,
          department:true
        }*/
      });
      return{
        carnet
      }
  }
  
  private async getCarnet(id:string) {
    try{
        const carnet = await this.prisma.carnets.findFirst({
            where: {
                    cedule: id
            },
            include: {
                        department:true,
                        charge:true,
                        access_levels:true,
                        state:true,
                        status:true
                    },
        });
        return carnet;
    } catch (error) {
        throw new HttpException('Error findOne carnet', 500);
    }
  }

  async findOne(id: string) {
    const carnet= await this.getCarnet(id);
      if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          carnet
      }
  }
  

async updateVisitante(id: string,updateCarnetDto: UpdateCarnetDto) {
const carnet= await this.getCarnet(id);
if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);
console.log(updateCarnetDto)

const {note}= updateCarnetDto;
const updatedCarnet = await this.prisma.carnets.update({
        where: {
          id: carnet.id
        },
        data:{
            note: note,
        }
});
return {
          carnet
      }
}

 

  async update(id: string,updateCarnetDto: UpdateCarnetDto) {
     const carnet= await this.getCarnet(id);
    if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);
    
    //console.log(updateCarnetDto)
    const {type_creations,...data}= updateCarnetDto;

    

    const { name,
            lastname,
            card_code,
            expiration,
            note,
            cedule,
            address,
            cellpone,
            //photo,
            //qr,
            //municipalities,
            //parishes,
            department,
            charge,
            status,
            access_levels,
            state
        }= data

     let exist = await this.prisma.carnets.findFirst({
            where: {
                    card_code: card_code
            }
        });
   //if(exist)throw new HttpException('Ya existe un carnet con ese Codigo', 500);


    const updatedCarnet = await this.prisma.carnets.update({
        where: {
          id: carnet.id
        },
        data:{
          name: name,
          lastname: lastname,
          expiration: expiration,
          note: note,
          cedule: cedule,
          address: address,
          cellpone: cellpone,
          card_code: card_code,
          department: { connect: { id: department as number } },
          charge: { connect: { id: charge as number } },
          type_creations: { connect: { id: 2 } },
          status: { connect: { id: status as number } },
          access_levels: { connect: { id: access_levels as number } },
          state: { connect: { id: state as number } },
          //municipalities: municipalities,
          //parishes: parishes,
          updated_at: new Date()
        }
    });
    
    const barcodePath = path.join(__dirname, '..','..', 'barcodes',id+".png");
    const qrCodePath = path.join(__dirname, '..','..', 'qr',id+".png");
    const uploadPath = path.join(__dirname, '..', '..', 'tmp',id);
    const filePath = path.join(__dirname, '..','..', 'uploads',id);



    await this.utils.deleteFile(barcodePath);
    await this.utils.deleteFile(qrCodePath);
    await this.utils.deleteDir(filePath);
  

    const person = await this.getProfile(cedule);
    //si es 100 elimina la imagen actual,porque se enviara una de reemplazo
    if(type_creations==100){ //elimina la foto que ya esta guardada
      console.log("usar nueva foto")
      await this.utils.deleteFile(uploadPath);
      //await this.utils.generateBarcode(person.card_code, cedule);
      //await this.utils.generateQrCode(this.qrurl+"?id="+this.utils.encryptNumericString(cedule),cedule);
    }else{// usa la foto  que ya esta guardada 
      console.log("usar vieja foto")
      if(!person) throw new HttpException('No existe el perfil', 500);
      await this.utils.generateBarcode(person.card_code, cedule);
      await this.utils.generateQrCode(this.qrurl+"?id="+this.utils.encryptNumericString(cedule),cedule);
      await this.makeCarnet(cedule,cedule);
      await this.makeCarnet2(cedule,cedule);
      //await fs.emptyDir(this.uploadPath);
    }
    return {
        res:"ok"
    };
  }

 
async removeVisitante(id: string) {

    const carnet= await this.getCarnet(id);
    if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedCarnet = await this.prisma.carnets.delete({
      where: {
        id: carnet.id
      },
    });

    return {deletedCarnet}
  }

  async remove(id: string) {

    await this.utils.removeById(id);
    const carnet= await this.getCarnet(id);
    if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedCarnet = await this.prisma.carnets.delete({
      where: {
        id: carnet.id
      },
    });

    /*const barcodePath = path.join(__dirname, '..','..', 'barcodes',id+".png");
    const qrCodePath = path.join(__dirname, '..','..', 'qr',id+".png");
    const uploadPath = path.join(__dirname, '..', '..', 'tmp',id);
    const filePath = path.join(__dirname, '..','..', 'uploads',id);


    await this.deleteFile(barcodePath);
    await this.deleteFile(qrCodePath);
    await this.deleteFile(uploadPath);
    await this.deleteDir(filePath);*/
    return {deletedCarnet}
  }
}
