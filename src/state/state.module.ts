import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [StateController],
  providers: [StateService,PrismaService],
  exports:[StateService]
})
export class StateModule {}
