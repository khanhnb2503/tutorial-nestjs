import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesGlobal } from '../index.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tutorial-nestjs'),
    ModulesGlobal
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Thiết lập Authentication ở tất cả các Router
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard
    // }
  ],
})
export class AppModule { }
