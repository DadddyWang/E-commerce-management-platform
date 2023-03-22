import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 订单信息
 */
@EntityModel('message')
export class MessageEntity extends BaseEntity {
  @Column({ comment: '发送者id' })
  sender_id: number;

  @Column({ comment: '接收者id' })
  receiver_id: number;

  @Column({ comment: '消息标题' })
  title: string;

  @Column({ comment: '消息内容' })
  text: string;

  @Column({ comment: '是否阅读' })
  is_read: number;
}
