import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaService } from '../db-connections/prisma.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService,PrismaService],
  exports:[DepartmentService]
})
export class DepartmentModule {}
