import { Module } from '@nestjs/common';
import { HairColorsService } from './hair_colors.service';
import { HairColorsController } from './hair_colors.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [HairColorsController],
  providers: [HairColorsService,PrismaService],
  exports:[HairColorsService]
})
export class HairColorsModule {}
