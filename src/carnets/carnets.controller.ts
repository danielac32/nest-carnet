import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors, UploadedFile,UseGuards,Query } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('carnets')
export class CarnetsController {
  constructor(private readonly carnetsService: CarnetsService) {}
  
 

  @UseGuards(JwtAuthGuard)
  @Post('upload/:cedule')
  @UseInterceptors(FileInterceptor('file'))
  makeCarnet(@Param('cedule') cedule: string,@UploadedFile() file: Express.Multer.File) {
    return this.carnetsService.fileUpload(file,cedule);
  }


  @Get('make')
  carnet() {
    return this.carnetsService.make();
  }


/*
  @UseGuards(JwtAuthGuard)
  @Post('upload')
   @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // carpeta donde se guardarán los archivos
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        //const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', file };
  }


*/


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetsService.create(createCarnetDto);
  }
  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.carnetsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carnetsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarnetDto: UpdateCarnetDto) {
    return this.carnetsService.update(id, updateCarnetDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carnetsService.remove(id);
  }
}
