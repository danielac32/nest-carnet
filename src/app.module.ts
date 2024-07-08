import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarnetsModule } from './carnets/carnets.module';
import { DepartmentModule } from './department/department.module';
import { StateModule } from './state/state.module';
import { StatusesModule } from './statuses/statuses.module';
//import { MunicipalitiesModule } from './municipalities/municipalities.module';
//import { ParishesModule } from './parishes/parishes.module';
import { ChargeModule } from './charge/charge.module';
import { TexturesModule } from './textures/textures.module';
import { AccessLevelsModule } from './access_levels/access_levels.module';
import { GendersModule } from './genders/genders.module';
import { HairColorsModule } from './hair_colors/hair_colors.module';
import { SkinColorsModule } from './skin_colors/skin_colors.module';
//import { CivilStatusesModule } from './civil_statuses/civil_statuses.module';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './seeder/seeder.module';
import { StatusModule } from './status/status.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Ruta donde están los archivos estáticos
      serveRoot: '/static', // Ruta base desde donde se servirán los archivos estáticos
    }),
    ConfigModule.forRoot(),AuthModule, CarnetsModule, DepartmentModule, StateModule, StatusesModule, ChargeModule, TexturesModule, AccessLevelsModule, GendersModule, HairColorsModule, SkinColorsModule, SeederModule, StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
