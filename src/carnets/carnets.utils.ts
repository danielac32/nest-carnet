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
export class CarnetsUtils {

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

  

  getImageBack(cargo:string):string{
      let fondo:string="CARNET-CIIP-MORADO.2.jpg";
      switch(cargo){
          case ValidCharge.ASESOR:
                fondo="ASESOR_NUEVO.2.jpg";
          break;
          case ValidCharge.VISITANTE:
                fondo="INVITADO_NUEVO.2.jpg";
          break;
          case ValidCharge.GERENTE:
          case ValidCharge.GERENTE_DE_AREA:
          case ValidCharge.GERENTE_DE_LINEA:
          case ValidCharge.COORDINADOR:
          case ValidCharge.ASISTENTE_EJECUTIVO:
               fondo="CARNET-CIIP-NARANJA.2.jpg";
          break;
          case ValidCharge.PRESIDENTE:
          case ValidCharge.VICEPRESIDENTE:
          case ValidCharge.GERENTE_GENERAL:
          case ValidCharge.AUDITOR_INTERNO:
          case ValidCharge.JURIDICA:
          case ValidCharge.JURIDICO:
               fondo="CARNET-CIIP-VIP.2.jpg";
          break;
          case ValidCharge.OFICIALES_DE_SEGURIDAD:
          case ValidCharge.ESCOLTA:
          case ValidCharge.SUPERVISOR_DE_SEGURIDAD:
          case ValidCharge.ASISTENTE_ADMINISTRATIVO:
          case ValidCharge.TECNICO:
          case ValidCharge.CHOFER:
          case ValidCharge.CHEF:
          case ValidCharge.COCINERO:
              fondo="CARNET-CIIP-VERDE.2.jpg";
          break;
          case ValidCharge.PROFESIONAL:
              fondo="CARNET-CIIP-VERDE.AD.2.jpg";
          break;
          case ValidCharge.OBRERO:
          case ValidCharge.SUPERVISOR_AUXILIAR:
    case ValidCharge.AUXILIAR_DE_SERVICIO:
              fondo="CARNET-CIIP-MORADO.2.jpg";
          break;
          case ValidCharge.PERSONAL_MEDICO:
    case ValidCharge.ENFERMERA:
    case ValidCharge.ENFERMERO:
    case ValidCharge.MEDICO:
    case ValidCharge.JEFE_DE_SERVICIO:
              fondo="CARNET-CIIP-ROJO.2.jpg";
          break;
          default:
             fondo="CARNET-CIIP-MORADO.2.jpg";
          break;
    }
    return fondo;
  }


  getImageFront(cargo:string):string{
        let fondo:string="CARNET-CIIP-MORADO.2.jpg";
        switch(cargo){
          case ValidCharge.ASESOR:
                fondo="ASESOR_NUEVO.jpg";
          break;
          case ValidCharge.VISITANTE:
                fondo="INVITADO_NUEVO.1.jpg";
          break;
          case ValidCharge.GERENTE:
          case ValidCharge.GERENTE_DE_AREA:
          case ValidCharge.GERENTE_DE_LINEA:
          case ValidCharge.COORDINADOR:
          case ValidCharge.ASISTENTE_EJECUTIVO:
               fondo="CARNET-CIIP-NARANJA.jpg"; 
          break;
          case ValidCharge.PRESIDENTE:
          case ValidCharge.VICEPRESIDENTE:
          case ValidCharge.GERENTE_GENERAL:
          case ValidCharge.AUDITOR_INTERNO:
          case ValidCharge.JURIDICA:
          case ValidCharge.JURIDICO:
               fondo="CARNET-CIIP-VIP.1.jpg";
          break;
          case ValidCharge.SUPERVISOR_DE_SEGURIDAD:
          case ValidCharge.ESCOLTA:
          case ValidCharge.OFICIALES_DE_SEGURIDAD:
          case ValidCharge.ASISTENTE_ADMINISTRATIVO:
          case ValidCharge.TECNICO:
          case ValidCharge.CHOFER:
          case ValidCharge.CHEF:
          case ValidCharge.COCINERO:
              fondo="CARNET-CIIP-VERDE.1.jpg";
          break;
          case ValidCharge.PROFESIONAL:
              fondo="CARNET-CIIP-VERDE.AD.1.jpg";
          break;
          case ValidCharge.OBRERO:
          case ValidCharge.SUPERVISOR_AUXILIAR:
    case ValidCharge.AUXILIAR_DE_SERVICIO:
              fondo="CARNET-CIIP-MORADO.1.jpg";
          break;
          case ValidCharge.PERSONAL_MEDICO:
          case ValidCharge.ENFERMERA:
          case ValidCharge.ENFERMERO:
          case ValidCharge.MEDICO:
          case ValidCharge.JEFE_DE_SERVICIO:
              fondo="CARNET-CIIP-ROJO.1.jpg";
          break;
          default:
             fondo="CARNET-CIIP-MORADO.1.jpg";
          break;
        }
       return fondo;
  }


encryptNumericString(text: string): string {
  //const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const map = {
    '0': 'a1', '1': 'b2', '2': 'c3', '3': 'd4', '4': 'e5',
    '5': 'f6', '6': 'g7', '7': 'h8', '8': 'i9', '9': 'j0'
  };
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);

    // Ensure we have a valid index
    if (map[char] !== undefined) {
      result += map[char];
    } else {
      result += char; // Handle non-numeric characters
    }
  }

  return result;
  /*
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

  return result;*/
}


 decryptNumericString(text: string): string {
  //const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const map = {
    'a1': '0', 'b2': '1', 'c3': '2', 'd4': '3', 'e5': '4',
    'f6': '5', 'g7': '6', 'h8': '7', 'i9': '8', 'j0': '9'
  };
  let result = '';
  let i = 0;

  while (i < text.length) {
    let char = text.substring(i, i + 2);

    // Ensure we have a valid character
    if (map[char] !== undefined) {
      result += map[char];
      i += 2;
    } else {
      result += text.charAt(i); // Handle non-encrypted characters
      i++;
    }
  }

  return result;
  /*
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

  return result;*/
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



  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        //throw new NotFoundException(`File ${filePath} not found`);
      }
      //throw error;
      console.log(`File ${filePath} not found`)
    }
  }
  async deleteDir(directoryPath: string): Promise<void> {
    try {
      await fs.rm(directoryPath, { recursive: true, force: true });
    } catch (error) {
      if (error.code === 'ENOENT') {
        //throw new NotFoundException(`Directory ${directoryPath} not found`);
      }
      //throw error;
      console.log(`Directory ${directoryPath} not found`)
    }
  }
  

  
async removeById(id: string){
  const barcodePath = path.join(__dirname, '..','..', 'barcodes',id+".png");
    const qrCodePath = path.join(__dirname, '..','..', 'qr',id+".png");
    const uploadPath = path.join(__dirname, '..', '..', 'tmp',id);
    const filePath = path.join(__dirname, '..','..', 'uploads',id);
    await this.deleteFile(barcodePath);
    await this.deleteFile(qrCodePath);
    await this.deleteFile(uploadPath);
    await this.deleteDir(filePath);
}







}
