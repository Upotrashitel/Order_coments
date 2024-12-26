import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderCommentService } from './order-comment.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateComment, OrderComment } from './order-comment.types';

const DEFAULT_COMMENT_MOCK = new OrderComment({
  rate: 5,
  orderId: 'some-order-id',
  relatedCommnetId: 'some-comment-id',
  possitiveText: 'Понравилось то-то',
  negativeText: 'Непонравилось это',
  neutralText: 'В целом норм',
});

@Controller('order-comment')
export class OrderCommentController {
  constructor(private readonly orderCommentService: OrderCommentService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Успешное получение комментариев',
    example: [DEFAULT_COMMENT_MOCK],
  })
  getComments() {
    return this.orderCommentService.getComments();
  }

  @Get(':comment_id')
  @ApiResponse({
    status: 200,
    description: 'Успешное получение комментария',
    example: DEFAULT_COMMENT_MOCK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Объект не найден',
    example: new HttpException('Объект не найден', HttpStatus.NOT_FOUND),
  })
  getById(@Param('comment_id') id: string) {
    return this.orderCommentService.getById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Успешное создание комментария',
    example: DEFAULT_COMMENT_MOCK,
  })
  createNewComment(@Body() comment: CreateComment) {
    return this.orderCommentService.createComment(comment);
  }

  @Put(':comment_id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Успешное обновление комментария',
    example: DEFAULT_COMMENT_MOCK,
  })
  @ApiParam({ type: 'string', name: 'comment_id' })
  editComment(@Param('comment_id') id: string, @Body() comment: CreateComment) {
    return this.orderCommentService.editComment(id, comment);
  }
}