import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { PrismaService } from '../db-connections/prisma.service';



@Injectable()
export class GendersService {

  constructor(
    private prisma: PrismaService,
  ) {}


  async create(createGenderDto: CreateGenderDto) {
    try{
        const genders = await this.prisma.genders.create({
                data:{
                    ...createGenderDto,
                }
        });
        return {
            genders
        }
    } catch (error) {
            throw new HttpException('Error creating gender', 500);
    }
  }

  async findAll() {
    const genders = await this.prisma.genders.findMany();
      return{
        genders
      }
  }

  private async getGender(id:string) {
    try{
        const gender = await this.prisma.genders.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return gender;
    } catch (error) {
        throw new HttpException('Error findOne gender', 500);
    }
  }

  async findOne(id: string) {
    const gender= await this.getGender(id);
      if(!gender)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          gender
      }
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
    const gender= await this.getGender(id);
    if(!gender)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedGender = await this.prisma.genders.update({
        where: {
          id: gender.id
        },
        data:{
          ...updateGenderDto
        }
    });
    return {updatedGender};
  }

  async remove(id: string) {
    const gender= await this.getGender(id);
    if(!gender)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedGender = await this.prisma.genders.delete({
      where: {
        id: gender.id
      },
    });
    return {deletedGender}
  }
}
