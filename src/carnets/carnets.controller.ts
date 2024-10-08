import { Controller, Get, Post, Body, Res,Patch, Param, Delete,UseInterceptors, UploadedFile,UseGuards,Query } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import {CarnetsUtils} from './carnets.utils'


@ApiBearerAuth()
@Controller('carnets')
export class CarnetsController {
  constructor(private readonly carnetsService: CarnetsService,private utils: CarnetsUtils,) {}
  
  

  @Get('barcode')
  async generateBarcode(@Query('number') number: string, @Query('filename') filename: string): Promise<string> {
    if (!number || !filename) {
      throw new Error('Number and filename are required');
    }
    return this.utils.generateBarcode(number, filename);
  }

  @Get('qr')
  async generateQr(@Query('data') data: string, @Query('filename') filename: string): Promise<string> {
    if (!data) {
      throw new Error('Data is required');
    }
    return this.utils.generateQrCode(data,filename);
  }


  
  @UseGuards(JwtAuthGuard)
  @Get('files/:cedule')
  getFile(@Param('cedule') cedule: string,@Res() res: Response) {
 
      const filePath = this.carnetsService.getFilePath(cedule);
      res.download(filePath); // Envía el archivo para su descarga
   
  }

  

  @UseGuards(JwtAuthGuard)
  @Get('files2/:cedule')
  getFile2(@Param('cedule') cedule: string,@Res() res: Response) {
 
      const filePath = this.carnetsService.getFilePath2(cedule);
      res.download(filePath); // Envía el archivo para su descarga
   
  }



  @UseGuards(JwtAuthGuard)
  @Post('upload/:cedule')
  @UseInterceptors(FileInterceptor('file'))
  makeCarnet(@Param('cedule') cedule: string,@UploadedFile() file: Express.Multer.File) {
    return this.carnetsService.fileUpload(file,cedule);
  }

  
  @Post('codebar/:id')
  getBarCode(@Param('id') id: string) {
    return this.carnetsService.getBarcode(id);
  }

  @Post('test/:id')
  test(@Param('id') id: string) {
    return this.utils.encryptNumericString(id);
  }

  
  /*@Get('make')
  carnet() {
    return this.carnetsService.make();
  }
  
  @Post('test/:id')
  test(@Param('id') id: string) {
    return this.utils.formatCedula(id);
  }*/

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
  @Post('visitante')
  createVisitante(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetsService.createVisitante(createCarnetDto);
  }


  @UseGuards(JwtAuthGuard)
  @Post('asesor')
  createAsesor(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetsService.createAsesor(createCarnetDto);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetsService.create(createCarnetDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('getFilter')
  getFilter(@Query('filter') filter: number,@Query('limit') limit: string,@Query('page') page: string) {
       return this.carnetsService.getFilterCarnets(filter,+limit,+page);
  }


  @UseGuards(JwtAuthGuard)
  @Get('get')
  get(@Query('status') status: number,@Query('limit') limit: string,@Query('page') page: string) {
       return this.carnetsService.getCarnets(status,+limit,+page);
  }


  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.carnetsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cedule')
  findOne(@Param('cedule') cedule: string) {
    return this.carnetsService.findOne(cedule);
  }



  @Get('get2/:cedule')
  findOne2(@Param('cedule') cedule: string) {
    return this.carnetsService.findOne(cedule);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateVisitante/:id')
  updateVisitante(@Param('id') id: string, @Body() updateCarnetDto: UpdateCarnetDto) {
    return this.carnetsService.updateVisitante(id, updateCarnetDto);
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
  @UseGuards(JwtAuthGuard)
  @Delete('deleteVisitante/:id')
  removeVisitante(@Param('id') id: string) {
    return this.carnetsService.removeVisitante(id);
  }
}
