import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { HairColorsService } from './hair_colors.service';
import { CreateHairColorDto } from './dto/create-hair_color.dto';
import { UpdateHairColorDto } from './dto/update-hair_color.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('hair-colors')
export class HairColorsController {
  constructor(private readonly hairColorsService: HairColorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHairColorDto: CreateHairColorDto) {
    return this.hairColorsService.create(createHairColorDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.hairColorsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hairColorsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHairColorDto: UpdateHairColorDto) {
    return this.hairColorsService.update(id, updateHairColorDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hairColorsService.remove(id);
  }
}
