import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('charge')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargeService.create(createChargeDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.chargeService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargeService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(id, updateChargeDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeService.remove(id);
  }
}
