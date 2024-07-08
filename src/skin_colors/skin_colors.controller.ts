import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { SkinColorsService } from './skin_colors.service';
import { CreateSkinColorDto } from './dto/create-skin_color.dto';
import { UpdateSkinColorDto } from './dto/update-skin_color.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('skin-colors')
export class SkinColorsController {
  constructor(private readonly skinColorsService: SkinColorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSkinColorDto: CreateSkinColorDto) {
    return this.skinColorsService.create(createSkinColorDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.skinColorsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinColorsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkinColorDto: UpdateSkinColorDto) {
    return this.skinColorsService.update(id, updateSkinColorDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinColorsService.remove(id);
  }
}
