import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { PrismaService } from '../db-connections/prisma.service';


@Injectable()
export class ChargeService {


  constructor(
    private prisma: PrismaService,
    ) {}

  async create(createChargeDto: CreateChargeDto) {
    try{
        const charges = await this.prisma.charge.create({
                data:{
                    ...createChargeDto,
                }
        });
        return {
            charges
        }
    } catch (error) {
            throw new HttpException('Error creating charge', 500);
    }
  }

  async findAll() {
    const charge = await this.prisma.charge.findMany();
      return{
        charge
      }
  }

  private async getCharge(id:string) {
    try{
        const charge = await this.prisma.charge.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return charge;
    } catch (error) {
        throw new HttpException('Error findOne charge', 500);
    }
  }

  async findOne(id: string) {
      const charge= await this.getCharge(id);
      if(!charge)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          charge
      }
  }

  async update(id: string, updateChargeDto: UpdateChargeDto) {
    const charge= await this.getCharge(id);
    if(!charge)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedCharge = await this.prisma.charge.update({
        where: {
          id: charge.id
        },
        data:{
          ...updateChargeDto
        }
    });
    return {updatedCharge};
  }

  async remove(id: string) {
    const charge= await this.getCharge(id);
    if(!charge)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedCharge = await this.prisma.charge.delete({
      where: {
        id: charge.id
      },
    });
    return {deletedCharge}
  }
}
