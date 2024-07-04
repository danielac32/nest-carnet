import { Injectable } from '@nestjs/common';
import { CreateParishDto } from './dto/create-parish.dto';
import { UpdateParishDto } from './dto/update-parish.dto';

@Injectable()
export class ParishesService {
  create(createParishDto: CreateParishDto) {
    return 'This action adds a new parish';
  }

  findAll() {
    return `This action returns all parishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parish`;
  }

  update(id: number, updateParishDto: UpdateParishDto) {
    return `This action updates a #${id} parish`;
  }

  remove(id: number) {
    return `This action removes a #${id} parish`;
  }
}
