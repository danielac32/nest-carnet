import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';
import { PrismaService } from '../db-connections/prisma.service';



@Injectable()
export class TexturesService {


  constructor(
  private prisma: PrismaService,
  ) {}


  async create(createTextureDto: CreateTextureDto) {
    try{
        const texture = await this.prisma.textures.create({
                data:{
                    ...createTextureDto,
                }
        });
        return {
            texture
        }
    } catch (error) {
            throw new HttpException('Error creating textures', 500);
    }
  }

  async findAll() {
    const texture = await this.prisma.textures.findMany();
      return{
        texture
      }
  }
  
  private async Texture(id:string) {
    try{
        const texture = await this.prisma.textures.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return texture;
    } catch (error) {
        throw new HttpException('Error findOne textures', 500);
    }
  }

  async findOne(id: string) {
    const texture= await this.Texture(id);
      if(!texture)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          texture
      }
  }

  async update(id: string, updateTextureDto: UpdateTextureDto) {
    const texture= await this.Texture(id);
    if(!texture)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedTextures = await this.prisma.textures.update({
        where: {
          id: texture.id
        },
        data:{
          ...updateTextureDto
        }
    });
    return {updatedTextures};
  }

  async remove(id: string) {
    const texture= await this.Texture(id);
    if(!texture)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedTextures = await this.prisma.textures.delete({
      where: {
        id: texture.id
      },
    });
    return {deletedTextures}
  }
}
