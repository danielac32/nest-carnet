import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarnetsModule } from './carnets/carnets.module';

@Module({
  imports: [AuthModule, CarnetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
