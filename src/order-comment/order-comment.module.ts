import { Module } from '@nestjs/common';
import { OrderCommentService } from './order-comment.service';
import { OrderCommentController } from './order-comment.controller';

@Module({
  controllers: [OrderCommentController],
  providers: [OrderCommentService],
})
export class OrderCommentModule {}
