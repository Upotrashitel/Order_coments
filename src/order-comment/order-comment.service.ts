import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComment, OrderComment } from './order-comment.types';

@Injectable()
export class OrderCommentService {
  private comments: OrderComment[] = [];

  public getComments(): OrderComment[] {
    return this.comments;
  }

  public getById(id: string): OrderComment {
    const finded = this.comments.find((item) => item.id === id);

    if (!finded)
      throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);

    return finded;
  }

  public createComment(comment: CreateComment): OrderComment {
    const commentBuild: OrderComment = {
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...comment,
    };

    this.comments.push(commentBuild);

    return commentBuild;
  }

  public editComment(id: string, comment: CreateComment): OrderComment {
    const currentComment = this.comments.find((item) => item.id === id);

    if (!currentComment)
      throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);

    let returnedComment = { ...currentComment };

    this.comments = this.comments.map((item) => {
      if (item.id === id) {
        returnedComment = {
          ...returnedComment,
          ...comment,
          updatedAt: new Date().toISOString(),
        };
        return returnedComment;
      }

      return item;
    });

    return returnedComment;
  }
}
