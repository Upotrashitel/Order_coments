import { ApiProperty } from '@nestjs/swagger';

const defaultCommnetsText = {
  positiveText: '',
  negativeText: '',
  neutralText: '',
};

export class CommentTexts {
  constructor(props = defaultCommnetsText) {
    const { positiveText, negativeText, neutralText } = {
      ...defaultCommnetsText,
      ...props,
    };
    this.positiveText = positiveText;
    this.neutralText = neutralText;
    this.negativeText = negativeText;
  }
  @ApiProperty({ description: 'Положительный комментарий', required: false })
  positiveText: string;

  @ApiProperty({ description: 'Отрицательный комментарий', required: false })
  negativeText: string;

  @ApiProperty({ description: 'Дополнение к комментарию', required: false })
  neutralText: string;
}

export class OrderComment extends CommentTexts {
  constructor(props) {
    const { rate, entryId, ...texts } = props;
    super(texts);

    this.id = 'commnet_id-' + Date.now().toString();
    this.rate = rate;
    this.entryId = entryId;
    this.relatedCommnetId = props.relatedCommnetId || null;
  }
  @ApiProperty({ description: 'ID коментария' })
  id: string;

  @ApiProperty({ description: 'Оценка' })
  rate: number;

  @ApiProperty({ description: 'Заказ, к которому написан комментарий' })
  entryId: string;

  @ApiProperty({
    description: 'ID комментария на который ссылается текущий комментарий',
    required: false,
  })
  relatedCommnetId: string | null;

  @ApiProperty({
    description: 'Дата создания',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления',
  })
  updatedAt: string;

  type?: string;
}

export class CreateComment extends CommentTexts {
  @ApiProperty({ description: 'Оценка' })
  rate: number;

  @ApiProperty({ description: 'Заказ, к которому написан комментарий' })
  entryId: string;

  @ApiProperty({
    description: 'ID комментария на который ссылается текущий комментарий',
    required: false,
  })
  relatedCommnetId: string | null;
}
