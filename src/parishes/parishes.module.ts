import { Module } from '@nestjs/common';
import { ParishesService } from './parishes.service';
import { ParishesController } from './parishes.controller';

@Module({
  controllers: [ParishesController],
  providers: [ParishesService],
})
export class ParishesModule {}
