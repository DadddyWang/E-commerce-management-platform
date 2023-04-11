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

  @Column({ comment: '收货地' })
  address: string;

  //支付情况,0未支付，1已支付
  @Column({ comment: '支付状态,0未支付,1已支付' })
  payStatus: number;
}
