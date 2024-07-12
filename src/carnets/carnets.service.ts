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



@Injectable()
export class CarnetsService {
private readonly uploadPath = join(__dirname, '..', '..', 'tmp');


  constructor(
    private prisma: PrismaService,
    ) {}


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


  async generateBarcode(number: string, filename: string): Promise<string> {
    try {
      const barcodePath = path.join(__dirname, '..','..', 'barcodes'); // Directorio para guardar los códigos de barras
      const barcodeFilePath = path.join(barcodePath, `${filename}.png`);

      // Crear un lienzo (canvas) para el código de barras con dimensiones específicas
      const canvas = createCanvas(400, 200); // Ancho y alto del lienzo en píxeles
      await JsBarcode(canvas, number, { format: 'CODE128' });
      // Asegúrate de que la carpeta de destino existe
      await fs.ensureDir(barcodePath);
      // Guardar el lienzo como archivo PNG
      const out = fs.createWriteStream(barcodeFilePath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      // Esperar hasta que el archivo esté completamente escrito
      await new Promise<void>((resolve, reject) => {
        out.on('finish', resolve);
        out.on('error', reject);
      });
      console.log("codigo de barra generado")
      return barcodeFilePath; // Devolver la ruta del archivo guardado
    } catch (error) {
      throw new Error(`Failed to generate barcode: ${error.message}`);
    }
  }

  async generateQrCode(data: string,cedule: string): Promise<string> {
    try {
      const qrCodePath = path.join(__dirname, '..','..', 'qr');
      await fs.ensureDir(qrCodePath);
      const qrCodeFilePath = path.join(qrCodePath, `${cedule}.png`);
      await QRCode.toFile(qrCodeFilePath, data);
     // this.makeCarnet2(`${cedule}.png`,cedule);
      console.log("codigo qr generado")
      return qrCodeFilePath; // Devolver la ruta del archivo guardado
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
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

      await this.generateBarcode("123456", filename);
      await this.generateQrCode("daniel quintero",filename);
      await this.makeCarnet(filename,cedule);
      await this.makeCarnet2(filename,cedule);
      //await fs.emptyDir(this.uploadPath);
      return { message: 'File uploaded successfully', filename, cedule };
    } catch (error) {
      console.error('Error saving file:', error);
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

formatCedula(cedula: string) {
  if (!/^\d+$/.test(cedula)) {
    throw new Error("Input must be a valid number string.");
  }
  // Convertir el string a número entero
  let num = parseInt(cedula, 10);
  // Convertir el número a string con puntos como separadores de miles
  return "V-"+num.toLocaleString('de-DE');

}


async makeCarnet2(file: string, cedule: string) {
  const fondo: string = 'atras.jpg';
  const canvasWidth = 918; // Ancho del lienzo
  const canvasHeight = 1446; // Alto del lienzo
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
  const qrX = ((canvasWidth - qrWidth) / 2)+150;
  const qrY = ((canvasHeight - qrHeight) / 2) + 420;
  const qrRadius = 60;

  await this.drawRoundedImage(ctx, qrImage, qrX, qrY, qrWidth, qrHeight, qrRadius);

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
    let fondo:string='frente-blanco.jpg';

    
    const person = await this.getProfile(cedule);
    if(!person) throw new HttpException('No existe el perfil', 500);
    

    const updatedCarnet = await this.prisma.carnets.update({
        where: {
          id:person.id
        },
        data:{
          photo:file
        }
    });


    nombre = person.name + " " + person.lastname;
    cedula = cedule;
    departamento = person.department.name;
    cargo= person.charge.name;
    
    if(cargo === ValidCharge.GERENTE){
       fondo = 'frente-dorado.jpg';
    }

    const canvasWidth = 1080;//319*2; // Ancho del lienzo
    const canvasHeight = 1701;//502*2; // Alto del lienzo
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Cargar la imagen de carnet
    const imagePath = path.join(__dirname, '..', '..', 'image', fondo);
    const carnetImage = await loadImage(imagePath);

    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);


    // Cargar la imagen que quieres superponer en el centro
    const overlayImagePath = path.join(__dirname, '..', '..', 'tmp', file);
    const overlayImage = await loadImage(overlayImagePath);
    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);
    
    
    const overlayWidth = (canvasWidth/2)-140;//400;
    const overlayHeight = (canvasHeight/3)-46;//521;

    // Calcular las coordenadas para centrar la imagen superpuesta
    const overlayX = (canvasWidth - overlayImage.width) /2;
    const overlayY = (canvasHeight - overlayImage.height) /3;
    
    const xx = (canvasWidth - overlayWidth) / 2;
    const yy = (canvasHeight - overlayHeight) / 2;
    const radius = 60; // Ajusta el radio de las esquinas redondeadas

   await this.drawRoundedImage(ctx, overlayImage, xx-3, yy-191, overlayWidth, overlayHeight, radius);
    // Superponer la imagen en el centro del lienzo
    //ctx.drawImage(overlayImage, overlayX-91, overlayY-70,overlayWidth, overlayHeight);
     
    ctx.font = 'bold 65px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    let x:number=nombre.length;
    let medio:number = canvasWidth /2;
    let pos:number=(canvasWidth -x)/2
    ctx.fillText(nombre.toUpperCase(), pos, (canvasHeight/2)+200);  
    
    ctx.font = '50px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cedula.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(this.formatCedula(cedula), pos, (canvasHeight/2)+280);  
    

    ctx.font = '50px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=departamento.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(departamento.toUpperCase(), pos, (canvasHeight/2)+390);  


    ctx.font = 'bold 75px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cargo.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(cargo, pos, (canvasHeight/2)+570);  


    // Guardar la imagen resultante
    //const outputFilePath = path.join(__dirname, '..', '..', 'uploads/'+cedule, file);
    const outputDir = path.join(__dirname, '..', '..', 'uploads', cedule);
    const outputFilePath = path.join(outputDir, `${file}`);
    
    try {
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




async drawRoundedImage(ctx, img, x, y, width, height, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();

  // Dibujar la imagen dentro de la máscara
  ctx.drawImage(img, x, y, width, height);

  ctx.restore();
}


/*********************************************************************************************/
  async make(){
    const nombre:string = "Daniel E. Quintero V.";
    const cedula:string = "V-20327658";
    const departamento:string="Direccion general de tecnologia";
    const cargo:string = "COORDINADOR";

    const canvasWidth = 1080;//319*2; // Ancho del lienzo
    const canvasHeight = 1701;//502*2; // Alto del lienzo
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Cargar la imagen de carnet

    const imagePath = path.join(__dirname, '..', '..', 'image', 'frente-blanco.jpg');

    const carnetImage = await loadImage(imagePath);

    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);


    // Cargar la imagen que quieres superponer en el centro
    const overlayImagePath = path.join(__dirname, '..', '..', 'image', 'yo.png');
    const overlayImage = await loadImage(overlayImagePath);
    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);
    
    
    const overlayWidth = (canvasWidth/2)-141;//400;
    const overlayHeight = (canvasHeight/3)-42;//521;

    // Calcular las coordenadas para centrar la imagen superpuesta
    const overlayX = (canvasWidth - overlayImage.width) /2;
    const overlayY = (canvasHeight - overlayImage.height) /3;
    
    const xx = (canvasWidth - overlayWidth) / 2;
    const yy = (canvasHeight - overlayHeight) / 2;
    const radius = 60; // Ajusta el radio de las esquinas redondeadas

    await this.drawRoundedImage(ctx, overlayImage, xx, yy-188, overlayWidth, overlayHeight, radius);
    // Superponer la imagen en el centro del lienzo
    //ctx.drawImage(overlayImage, overlayX-91, overlayY-70,overlayWidth, overlayHeight);
     
    ctx.font = 'bold 65px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    let x:number=nombre.length;
    let medio:number = canvasWidth /2;
    let pos:number=(canvasWidth -x)/2
    ctx.fillText(nombre, pos, (canvasHeight/2)+200);  
    
    ctx.font = '50px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cedula.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(cedula, pos, (canvasHeight/2)+280);  
    

    ctx.font = '50px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=departamento.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(departamento, pos, (canvasHeight/2)+390);  


    ctx.font = 'bold 75px arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    x=cargo.length;
    medio= canvasWidth /2;
    pos=(canvasWidth -x)/2
    ctx.fillText(cargo, pos, (canvasHeight/2)+570);  


    // Guardar la imagen resultante
    const outputFilePath = path.join(__dirname, '..', '..', 'uploads', 'imagen-resultante.jpg');
    try {
      const out = fs.createWriteStream(outputFilePath);
      const stream = canvas.createJPEGStream({ quality: 200 });
      stream.pipe(out);
      out.on('finish', () => console.log(`Imagen guardada en ${outputFilePath}`));
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw new Error('Error al guardar la imagen');
    }

    return { outputFilePath };
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
            photo,
            qr,
            municipalities,
            parishes,
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
   

   const exist = await this.prisma.carnets.findFirst({
            where: {
                    cedule: cedule
            }
        });
   if(exist)throw new HttpException('El perfil ya esta registrado', 500);

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
                photo: photo,
                qr: qr,
                municipalities:municipalities,
                parishes:parishes,
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
            }
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

  async update(id: string, updateCarnetDto: UpdateCarnetDto) {
    /*const carnet= await this.getCarnet(id);
    if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedCarnet = await this.prisma.carnets.update({
        where: {
          id: carnet.id
        },
        data:{
          ...updateCarnetDto
        }
    });
    return {updatedCarnet};*/
    return ""
  }

  async remove(id: string) {
    const carnet= await this.getCarnet(id);
    if(!carnet)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedCarnet = await this.prisma.carnets.delete({
      where: {
        id: carnet.id
      },
    });
    return {deletedCarnet}
  }
}