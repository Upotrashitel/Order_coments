import { Module } from '@nestjs/common';
import { OrderCommentService } from './order-comment.service';
import { OrderCommentController } from './order-comment.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OrderCommentController],
  providers: [OrderCommentService],
})
export class OrderCommentModule {}
