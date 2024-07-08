import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from '../db-connections/prisma.service';


@Injectable()
export class StatusService {

  constructor(
  private prisma: PrismaService,
  ) {}


  async create(createStatusDto: CreateStatusDto) {
    try{
        const status = await this.prisma.status.create({
                data:{
                    ...createStatusDto,
                }
        });
        return {
            status
        }
    } catch (error) {
            throw new HttpException('Error creating status', 500);
    }
  }

  async findAll() {
    const status = await this.prisma.status.findMany();
      return{
        status
      }
  }


  private async getStatus(id:string) {
    try{
        const status = await this.prisma.status.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return status;
    } catch (error) {
        throw new HttpException('Error findOne status', 500);
    }
  }


  async findOne(id: string) {
    const status= await this.getStatus(id);
      if(!status)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          status
      }
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    const status= await this.getStatus(id);
    if(!status)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedStatus = await this.prisma.status.update({
        where: {
          id: status.id
        },
        data:{
          ...updateStatusDto
        }
    });
    return {updatedStatus};
  }

  async remove(id: string) {
    const status= await this.getStatus(id);
    if(!status)throw new NotFoundException(`Entity with ID ${id} not found`);
    const deletedStatus = await this.prisma.status.delete({
      where: {
        id: status.id
      },
    });
    return {deletedStatus}
  }
}
