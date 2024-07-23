import { Injectable, UploadedFile,HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

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


@Injectable()
export class CarnetsImage {

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










}