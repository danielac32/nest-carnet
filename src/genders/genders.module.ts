import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [GendersController],
  providers: [GendersService,PrismaService],
  exports:[GendersService]
})
export class GendersModule {}
