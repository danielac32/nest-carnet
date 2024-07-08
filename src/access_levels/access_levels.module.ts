import { Module } from '@nestjs/common';
import { AccessLevelsService } from './access_levels.service';
import { AccessLevelsController } from './access_levels.controller';
import { PrismaService } from '../db-connections/prisma.service';


@Module({
  controllers: [AccessLevelsController],
  providers: [AccessLevelsService,PrismaService],
  exports:[AccessLevelsService]
})
export class AccessLevelsModule {}
