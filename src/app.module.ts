import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderCommentModule } from './order-comment/order-comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), OrderCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
