import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateHairColorDto } from './dto/create-hair_color.dto';
import { UpdateHairColorDto } from './dto/update-hair_color.dto';
import { PrismaService } from '../db-connections/prisma.service';



@Injectable()
export class HairColorsService {

  constructor(
    private prisma: PrismaService,
    ) {}

  async create(createHairColorDto: CreateHairColorDto) {
    try{
        const hair = await this.prisma.hair_colors.create({
                data:{
                    ...createHairColorDto,
                }
        });
        return {
            hair
        }
    } catch (error) {
            throw new HttpException('Error creating hair_colors', 500);
    }
  }

  async findAll() {
    const hair = await this.prisma.hair_colors.findMany();
      return{
        hair
      }
  }
  

  private async getHair(id:string) {
    try{
        const hair = await this.prisma.hair_colors.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return hair;
    } catch (error) {
        throw new HttpException('Error findOne hair', 500);
    }
  }

  async findOne(id: string) {
    const hair= await this.getHair(id);
      if(!hair)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          hair
      }
  }

  async update(id: string, updateHairColorDto: UpdateHairColorDto) {
    const hair= await this.getHair(id);
      if(!hair)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedHair = await this.prisma.hair_colors.update({
        where: {
          id: hair.id
        },
        data:{
          ...updateHairColorDto
        }
    });
    return {updatedHair};
  }

  async remove(id: string) {
    const hair= await this.getHair(id);
    if(!hair)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedHair = await this.prisma.hair_colors.delete({
      where: {
        id: hair.id
      },
    });
    return {deletedHair}
  }
}
