import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesGlobal } from '../index.module';

@Module({
  imports: [ModulesGlobal],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
