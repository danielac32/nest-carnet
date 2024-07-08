import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [ChargeController],
  providers: [ChargeService,PrismaService],
  exports:[ChargeService]
})
export class ChargeModule {}
