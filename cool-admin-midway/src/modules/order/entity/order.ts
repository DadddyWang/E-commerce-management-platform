import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 订单信息
 */
@EntityModel('order')
export class OrderEntity extends BaseEntity {
  @Column({ comment: '订单号' })
  orderNo: string;

  @Column({ comment: '订单类型' })
  orderType: string;

  @Column({ comment: '订单金额' })
  orderAmount: number;

  @Column({ comment: '购买用户id' })
  userId: number;
}
