import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from '../db-connections/prisma.service';


@Injectable()
export class StateService {

  constructor(
    private prisma: PrismaService,
    ) {}


  async create(createStateDto: CreateStateDto) {
    try{
        const state = await this.prisma.state.create({
                data:{
                    ...createStateDto,
                }
        });
        return {
            state
        }
    } catch (error) {
            throw new HttpException('Error creating state', 500);
    }
  }

  async findAll() {
    const state = await this.prisma.state.findMany();
      return{
        state
      }
  }
  
  private async getState(id:string) {
    try{
        const state = await this.prisma.state.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return state;
    } catch (error) {
        throw new HttpException('Error findOne state', 500);
    }
  }

  async findOne(id: string) {
    const state= await this.getState(id);
      if(!state)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          state
      }
  }

  async update(id: string, updateStateDto: UpdateStateDto) {
   const state= await this.getState(id);
    if(!state)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedState = await this.prisma.state.update({
        where: {
          id: state.id
        },
        data:{
          ...updateStateDto
        }
    });
    return {updatedState};
  }

  async remove(id: string) {
    const state= await this.getState(id);
    if(!state)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedState = await this.prisma.state.delete({
      where: {
        id: state.id
      },
    });
    return {deletedState}
  }
}
