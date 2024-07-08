import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

 
  @Get()
  findAll() {
    return this.seederService.findAll();
  }

 
}
