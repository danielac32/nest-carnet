import { Module } from '@nestjs/common';
import { SkinColorsService } from './skin_colors.service';
import { SkinColorsController } from './skin_colors.controller';
import { PrismaService } from '../db-connections/prisma.service';


@Module({
  controllers: [SkinColorsController],
  providers: [SkinColorsService,PrismaService],
  exports:[SkinColorsService]
})
export class SkinColorsModule {}
