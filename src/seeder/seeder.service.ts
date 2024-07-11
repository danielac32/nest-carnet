import { Injectable } from '@nestjs/common';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';
import { PrismaService } from '../db-connections/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';

import { join } from 'path';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';



import {levels,
        statuse,
        departments,
        genders,
        hair_colors,
        skin_colors,
        states,
        status,
        textures,
        type_creations,
        users,
        charges
        } from './data'

@Injectable()
export class SeederService {

  constructor(
    private prisma: PrismaService
  ) {}


 

  async deleteAllTables(){
    await this.prisma.userEntity.deleteMany({});
    await this.prisma.carnets.deleteMany({});
    await this.prisma.type_creations.deleteMany({});
    await this.prisma.department.deleteMany({});
    await this.prisma.charge.deleteMany({});
    await this.prisma.textures.deleteMany({});
    await this.prisma.status.deleteMany({});
    await this.prisma.access_levels.deleteMany({});
    await this.prisma.genders.deleteMany({});
    await this.prisma.hair_colors.deleteMany({});
    await this.prisma.state.deleteMany({});
    await this.prisma.skin_colors.deleteMany({});
    await this.prisma.civil_statuses.deleteMany({});
    await this.prisma.municipalities.deleteMany({});
    //await this.prisma.parish.deleteMany({});
    console.log('All tables cleared.');
  }


  
  async findAll() {
    
    /*await this.deleteAllTables()
    .catch((e) => console.error(e))
    .finally(async () => {
      await this.prisma.$disconnect();
    });*/
    
    const barcodePath = path.join(__dirname, '..','..', 'barcodes');
    const qrPath = path.join(__dirname, '..','..', 'qr');
    const uploadsPath = path.join(__dirname, '..','..', 'uploads');
    await fs.emptyDir(barcodePath);
    await fs.emptyDir(qrPath);
    await fs.emptyDir(uploadsPath);

    for (const charge of charges) {
          await this.prisma.charge.create({
               data: charge
          });
    }
    const getCharge= await this.prisma.charge.findMany();

    for (const user of users) {
          await this.prisma.userEntity.create({
               data: user
          });
    }
    const getUser= await this.prisma.userEntity.findMany();


    for (const piso of levels) {
          await this.prisma.access_levels.create({
               data: piso
          });
    }
    const getLevels= await this.prisma.access_levels.findMany();

    for (const status of statuse) {
          await this.prisma.civil_statuses.create({
               data: status
          });
    }
    const getStatus= await this.prisma.status.findMany();
    
    for (const department of departments) {
          await this.prisma.department.create({
               data: department
          });
    }
    const getDepartment= await this.prisma.department.findMany();

    for (const gender of genders) {
          await this.prisma.genders.create({
               data: gender
          });
    }
    const getGender= await this.prisma.genders.findMany();

    
    for (const hair_color of hair_colors) {
          await this.prisma.hair_colors.create({
               data: hair_color
          });
    }
    const getHair_color= await this.prisma.hair_colors.findMany();

    for (const skin_color of skin_colors) {
          await this.prisma.skin_colors.create({
               data: skin_color
          });
    }
    const getSkin_color= await this.prisma.skin_colors.findMany();


    for (const state of states) {
          await this.prisma.state.create({
               data: state
          });
    }
    const getState= await this.prisma.state.findMany();

    
    for (const statu of status) {
          await this.prisma.status.create({
               data: statu
          });
    }
    const getStatu= await this.prisma.status.findMany();
 

    for (const texture of textures) {
          await this.prisma.textures.create({
               data: texture
          });
    }
    const getTexture= await this.prisma.textures.findMany();
    
    for (const type_creation of type_creations) {
          await this.prisma.type_creations.create({
               data: type_creation
          });
    }
    const getType_creation= await this.prisma.type_creations.findMany();

    return {
        getLevels,
        getStatus,
        getDepartment,
        getGender,
        getHair_color,
        getSkin_color,
        getStatu,
        getTexture,
        getType_creation,
        getUser
    };
  }

}
