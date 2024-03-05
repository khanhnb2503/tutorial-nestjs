import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesGlobal } from '../index.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tutorial-nestjs'),
    ModulesGlobal
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
