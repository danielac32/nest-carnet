import { Injectable } from '@nestjs/common';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';

@Injectable()
export class CarnetsService {
  create(createCarnetDto: CreateCarnetDto) {
    return 'This action adds a new carnet';
  }

  findAll() {
    return `This action returns all carnets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carnet`;
  }

  update(id: number, updateCarnetDto: UpdateCarnetDto) {
    return `This action updates a #${id} carnet`;
  }

  remove(id: number) {
    return `This action removes a #${id} carnet`;
  }
}
