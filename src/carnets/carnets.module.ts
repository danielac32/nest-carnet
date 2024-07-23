import { Module } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CarnetsController } from './carnets.controller';
import { PrismaService } from '../db-connections/prisma.service';
import {CarnetsUtils} from './carnets.utils'
import {CarnetsImage} from './carnets.image'
@Module({

  controllers: [CarnetsController],
  providers: [CarnetsService,PrismaService,CarnetsUtils,CarnetsImage],
  exports:[CarnetsService]
})
export class CarnetsModule {}
