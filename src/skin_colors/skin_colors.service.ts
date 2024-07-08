import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateSkinColorDto } from './dto/create-skin_color.dto';
import { UpdateSkinColorDto } from './dto/update-skin_color.dto';
import { PrismaService } from '../db-connections/prisma.service';


@Injectable()
export class SkinColorsService {

  constructor(
  private prisma: PrismaService,
  ) {}

  async create(createSkinColorDto: CreateSkinColorDto) {
    try{
        const skin = await this.prisma.skin_colors.create({
                data:{
                    ...createSkinColorDto,
                }
        });
        return {
            skin
        }
    } catch (error) {
            throw new HttpException('Error creating skin', 500);
    }
  }

  async findAll() {
    const skin = await this.prisma.skin_colors.findMany();
      return{
        skin
      }
  } 
  private async getSkin(id:string) {
    try{
        const skin = await this.prisma.skin_colors.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return skin;
    } catch (error) {
        throw new HttpException('Error findOne skin', 500);
    }
  }

  async findOne(id: string) {
     const skin= await this.getSkin(id);
      if(!skin)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          skin
      }
  }

  async update(id: string, updateSkinColorDto: UpdateSkinColorDto) {
    const skin= await this.getSkin(id);
    if(!skin)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedSkin = await this.prisma.skin_colors.update({
        where: {
          id: skin.id
        },
        data:{
          ...updateSkinColorDto
        }
    });
    return {updatedSkin};
  }

  async remove(id: string) {
    const skin= await this.getSkin(id);
    if(!skin)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedSkin = await this.prisma.skin_colors.delete({
      where: {
        id: skin.id
      },
    });
    return {deletedSkin}
  }
}
