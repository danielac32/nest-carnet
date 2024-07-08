import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from '../db-connections/prisma.service';



@Injectable()
export class StatusesService {

  constructor(
    private prisma: PrismaService,
    ) {}

  async create(createStatusDto: CreateStatusDto) {
    try{
        const statuses = await this.prisma.civil_statuses.create({
                data:{
                    ...createStatusDto,
                }
        });
        return {
            statuses
        }
    } catch (error) {
            throw new HttpException('Error creating civil_statuses', 500);
    }
  }

  async findAll() {
    const statuses = await this.prisma.civil_statuses.findMany();
      return{
        statuses
      }
  }
  
  private async getStatuses(id:string) {
    try{
        const statuses = await this.prisma.civil_statuses.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return statuses;
    } catch (error) {
        throw new HttpException('Error findOne statuses', 500);
    }
  }

  async findOne(id: string) {
    const statuses= await this.getStatuses(id);
      if(!statuses)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          statuses
      }
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    const statuses= await this.getStatuses(id);
    if(!statuses)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedStatuses = await this.prisma.civil_statuses.update({
        where: {
          id: statuses.id
        },
        data:{
          ...updateStatusDto
        }
    });
    return {updatedStatuses};
  }

  async remove(id: string) {
    const statuses= await this.getStatuses(id);
    if(!statuses)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedStatuses = await this.prisma.civil_statuses.delete({
      where: {
        id: statuses.id
      },
    });
    return {deletedStatuses}
  }
}
