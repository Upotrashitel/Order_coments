import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComment, OrderComment } from './order-comment.types';
import { HttpService } from '@nestjs/axios';
import { faker } from '@faker-js/faker';
import { mockComments } from 'src/mock/comments';

@Injectable()
export class OrderCommentService {
  constructor(private readonly httpService: HttpService) {}

  private comments: OrderComment[] = faker.helpers.multiple(
    this.createMockComment,
    { count: 300 },
  );

  public createMockComment(): OrderComment {
    return {
      id: faker.git.commitSha(),
      rate: faker.number.int({ min: 0, max: 5 }),
      entryId: '',
      relatedCommnetId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...faker.helpers.arrayElement(mockComments),
    };
  }

  public async getComments(
    entryId: string | undefined,
    orderType: 'product' | 'place' | 'service' | undefined,
  ): Promise<OrderComment[]> {
    const filteredById = this.comments.filter((item) =>
      entryId ? item.entryId === entryId : true,
    );

    if (orderType) {
      return filteredById.filter((item) => item.type === orderType);
    }

    return filteredById;
  }

  public getById(id: string): OrderComment {
    const finded = this.comments.find((item) => item.id === id);

    if (!finded)
      throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);

    return finded;
  }

  public async createComment(
    comment: CreateComment,
    host: string | undefined,
  ): Promise<OrderComment> {
    const commentBuild: OrderComment = {
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...comment,
    };

    try {
      if (!host) throw new Error();

      await this.httpService.axiosRef.post(
        `${process.env.HISTORY_APPLICATION_URL}/history-item`,
        {
          originalResource: {
            name: 'comments',
            otherPathForGetCurrentObject: `/order-comment/${commentBuild.id}`,
            method: 'GET',
            url: host,
          },
          after: JSON.stringify(commentBuild),
        },
      );
    } finally {
      this.comments.push(commentBuild);
      return commentBuild;
    }
  }

  public async editComment(
    id: string,
    comment: CreateComment,
    host: string | undefined,
  ): Promise<OrderComment> {
    const currentCommentIndex = this.comments.findIndex(
      (item) => item.id === id,
    );

    if (currentCommentIndex === -1)
      throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);

    const commentBuild = {
      ...this.comments[currentCommentIndex],
      ...comment,
      updatedAt: new Date().toISOString(),
    };

    try {
      if (!host) throw new Error();
      await this.httpService.axiosRef.post(
        `${process.env.HISTORY_APPLICATION_URL}/history-item`,
        {
          originalResource: {
            name: 'comments',
            otherPathForGetCurrentObject: `/order-comment/${commentBuild.id}`,
            method: 'GET',
            url: host,
          },
          after: JSON.stringify(commentBuild),
        },
      );

      this.comments = this.comments.map((item) => {
        if (item.id === id) return commentBuild;

        return item;
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }

    return commentBuild;
  }
}
