import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { OrderEntity } from '../entity/order';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

/**
 * 仪表盘
 */
@Provide()
export class DashboardService extends BaseService {
  @InjectEntityModel(OrderEntity)
  OrderEntity: Repository<OrderEntity>;

  async getTotalAmount() {
    const res = await this.OrderEntity.query(
      'SELECT SUM(orderAmount) FROM cool.order WHERE payStatus = 1'
    );
    return res;
  }
}
