import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { TexturesService } from './textures.service';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('textures')
export class TexturesController {
  constructor(private readonly texturesService: TexturesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTextureDto: CreateTextureDto) {
    return this.texturesService.create(createTextureDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.texturesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.texturesService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextureDto: UpdateTextureDto) {
    return this.texturesService.update(id, updateTextureDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.texturesService.remove(id);
  }
}
