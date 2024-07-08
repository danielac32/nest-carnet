import { Module } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CarnetsController } from './carnets.controller';
import { PrismaService } from '../db-connections/prisma.service';


@Module({
  controllers: [CarnetsController],
  providers: [CarnetsService,PrismaService],
  exports:[CarnetsService]
})
export class CarnetsModule {}
