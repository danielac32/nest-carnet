import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';
import { PrismaService } from '../db-connections/prisma.service';
import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

import { join } from 'path';
@Injectable()
export class CarnetsService {

  constructor(
    private prisma: PrismaService,
    ) {}



  async make(){
    const canvasWidth = 319; // Ancho del lienzo
    const canvasHeight = 502; // Alto del lienzo
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Cargar la imagen de carnet
    const imagePath = path.join(__dirname, '..', '..', 'uploads', '1.jpg');
    const carnetImage = await loadImage(imagePath);
    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);


    // Cargar la imagen que quieres superponer en el centro
    const overlayImagePath = path.join(__dirname, '..', '..', 'uploads', 'yo.png');
    const overlayImage = await loadImage(overlayImagePath);
    ctx.drawImage(carnetImage, 0, 0, canvasWidth, canvasHeight);

    
    const overlayWidth = 122;
    const overlayHeight = 159;

    // Calcular las coordenadas para centrar la imagen superpuesta
    const overlayX = (canvasWidth - overlayImage.width) / 2;
    const overlayY = (canvasHeight - overlayImage.height) / 2;

    // Superponer la imagen en el centro del lienzo
    ctx.drawImage(overlayImage, overlayX+46, overlayY+6,overlayWidth, overlayHeight);
//   

    // Agregar texto
    ctx.font = '20px Arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    ctx.fillText('Daniel Quintero', canvasWidth / 2, overlayY+195);  
    
    ctx.font = '18px Arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    ctx.fillText('V-20327658', canvasWidth / 2, overlayY+223);  

    ctx.font = '15px Arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#9B9B9B'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    ctx.fillText('Direccion general de tecnologia', canvasWidth / 2, overlayY+260);  
    
    ctx.font = '20px Arial'; // Definir el tamaño y la fuente del texto
    ctx.fillStyle = '#000000'; // Color del texto (blanco en este caso)
    ctx.textAlign = 'center'; // Alinear el texto al centro
    ctx.fillText('Coordinador', canvasWidth / 2, overlayY+307);


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
            extent,
            address,
            phone,
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
           textures,
           status,
           access_levels,
           genders,
           hair_colors,
           state,
           skin_colors,
           civil_statuses
    }=other;

   const carnet = await this.prisma.carnets.create({
          data:{
                name: name,
                lastname: lastname,
                card_code: card_code,
                expiration: expiration,
                note: note,
                cedule: cedule,
                extent: extent,
                address: address,
                phone: phone,
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
                textures: {
                  connect: { id: textures }
                },
                status: {
                  connect: { id: status }
                },
                access_levels: {
                  connect: { id: access_levels }
                },
                genders: {
                  connect: { id: genders }
                },
                hair_colors: {
                  connect: { id: hair_colors }
                },
                skin_colors: {
                  connect: { id: skin_colors }
                },
                state: {
                  connect: { id: state }
                },
                civil_statuses: {
                  connect: { id: civil_statuses }
                },
          }
    });

   return {
       carnet
   }
  }

  async findAll() {
      const carnet = await this.prisma.carnets.findMany({
        include: {
          type_creations:true
        }
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
