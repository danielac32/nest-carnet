import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarnetsModule } from './carnets/carnets.module';
import { DepartmentModule } from './department/department.module';
import { StateModule } from './state/state.module';
import { StatusesModule } from './statuses/statuses.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { ParishesModule } from './parishes/parishes.module';
import { ChargeModule } from './charge/charge.module';

@Module({
  imports: [AuthModule, CarnetsModule, DepartmentModule, StateModule, StatusesModule, MunicipalitiesModule, ParishesModule, ChargeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
