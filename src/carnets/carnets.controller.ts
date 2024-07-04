import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';

@Controller('carnets')
export class CarnetsController {
  constructor(private readonly carnetsService: CarnetsService) {}

  @Post()
  create(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetsService.create(createCarnetDto);
  }

  @Get()
  findAll() {
    return this.carnetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carnetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarnetDto: UpdateCarnetDto) {
    return this.carnetsService.update(+id, updateCarnetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carnetsService.remove(+id);
  }
}
