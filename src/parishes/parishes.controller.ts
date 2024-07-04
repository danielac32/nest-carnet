import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParishesService } from './parishes.service';
import { CreateParishDto } from './dto/create-parish.dto';
import { UpdateParishDto } from './dto/update-parish.dto';

@Controller('parishes')
export class ParishesController {
  constructor(private readonly parishesService: ParishesService) {}

  @Post()
  create(@Body() createParishDto: CreateParishDto) {
    return this.parishesService.create(createParishDto);
  }

  @Get()
  findAll() {
    return this.parishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParishDto: UpdateParishDto) {
    return this.parishesService.update(+id, updateParishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parishesService.remove(+id);
  }
}
