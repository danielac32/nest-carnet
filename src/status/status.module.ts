import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService,PrismaService],
  exports:[StatusService]
})
export class StatusModule {}
