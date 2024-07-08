import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService,PrismaService],
  exports:[StatusesService]
})
export class StatusesModule {}
