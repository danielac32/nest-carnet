import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../db-connections/prisma.service';



@Injectable()
export class DepartmentService {

  constructor(
    private prisma: PrismaService,
    ) {}


  async create(createDepartmentDto: CreateDepartmentDto) {
    try{
        const department = await this.prisma.department.create({
                data:{
                    ...createDepartmentDto,
                }
        });
        return {
            department
        }
    } catch (error) {
            throw new HttpException('Error creating department', 500);
    }
  }

  async findAll() {
      const department = await this.prisma.department.findMany();
      return{
        department
      }
  }


  private async getDepartment(id:string) {
    try{
        const department = await this.prisma.department.findFirst({
            where: {
                id: Number(id)
            }
        });
        return department;
    } catch (error) {
        throw new HttpException('Error findOne department', 500);
    }
  }

  async findOne(id: string) {
      const department= await this.getDepartment(id);
      if(!department)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          department
      }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department= await this.getDepartment(id);
    if(!department)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedDepartment = await this.prisma.department.update({
        where: {
          id: department.id
        },
        data:{
          ...updateDepartmentDto
        }
    });
    return {updatedDepartment};
  }

  async remove(id: string) {
    const department= await this.getDepartment(id);
    if(!department)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedDepartment = await this.prisma.department.delete({
      where: {
        id: department.id
      },
    });
    return {deletedDepartment}
  }
}
