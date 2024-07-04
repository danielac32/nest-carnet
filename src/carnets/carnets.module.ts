import { Module } from '@nestjs/common';
import { CarnetsService } from './carnets.service';
import { CarnetsController } from './carnets.controller';

@Module({
  controllers: [CarnetsController],
  providers: [CarnetsService],
})
export class CarnetsModule {}
