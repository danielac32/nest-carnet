import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { AccessLevelsService } from './access_levels.service';
import { CreateAccessLevelDto } from './dto/create-access_level.dto';
import { UpdateAccessLevelDto } from './dto/update-access_level.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('access-levels')
export class AccessLevelsController {
  constructor(private readonly accessLevelsService: AccessLevelsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAccessLevelDto: CreateAccessLevelDto) {
    return this.accessLevelsService.create(createAccessLevelDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.accessLevelsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessLevelsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessLevelDto: UpdateAccessLevelDto) {
    return this.accessLevelsService.update(id, updateAccessLevelDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessLevelsService.remove(id);
  }
}
