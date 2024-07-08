import { Module } from '@nestjs/common';
import { TexturesService } from './textures.service';
import { TexturesController } from './textures.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [TexturesController],
  providers: [TexturesService,PrismaService],
  exports:[TexturesService]
})
export class TexturesModule {}
