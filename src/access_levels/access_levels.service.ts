import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAccessLevelDto } from './dto/create-access_level.dto';
import { UpdateAccessLevelDto } from './dto/update-access_level.dto';
import { PrismaService } from '../db-connections/prisma.service';

@Injectable()
export class AccessLevelsService {

    constructor(
    private prisma: PrismaService,
    ) {}


  async create(createAccessLevelDto: CreateAccessLevelDto) {
   try{
        const access = await this.prisma.access_levels.create({
                data:{
                    ...createAccessLevelDto,
                }
        });
        return {
            access
        }
    } catch (error) {
            throw new HttpException('Error creating access_levels', 500);
    }
  }

  async findAll() {
    const access = await this.prisma.access_levels.findMany();
      return{
        access
      }
  }
  
  private async getAccess(id:string) {
    try{
        const access = await this.prisma.access_levels.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return access;
    } catch (error) {
        throw new HttpException('Error findOne access', 500);
    }
  }

  async findOne(id: string) {
    const access= await this.getAccess(id);
      if(!access)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          access
      }
  }

  async update(id: string, updateAccessLevelDto: UpdateAccessLevelDto) {
    const access= await this.getAccess(id);
    if(!access)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedAccess = await this.prisma.access_levels.update({
        where: {
          id: access.id
        },
        data:{
          ...updateAccessLevelDto
        }
    });
    return {updatedAccess};
  }

  async remove(id: string) {
    const access= await this.getAccess(id);
    if(!access)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedAccess = await this.prisma.access_levels.delete({
      where: {
        id: access.id
      },
    });
    return {deletedAccess}
  }
}
