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
    const res = {};
    res['totalAmount'] = await this.OrderEntity.query(
      'SELECT SUM(orderAmount) FROM cool.order WHERE payStatus = 1'
    );
    res['todayAmount'] = await this.OrderEntity.query(
      'SELECT SUM(orderAmount) FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m-%d") = CURDATE()'
    );
    res['yesterdayAmount'] = await this.OrderEntity.query(
      'SELECT SUM(orderAmount) FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m-%d") = DATE_SUB(CURDATE(), INTERVAL 1 DAY)'
    );
    return res;
  }

  async getTotalOrder() {
    //拿到未支付的订单笔数与已支付的订单笔数
    const res = {};
    res['payOrder'] = await this.OrderEntity.query(
      'SELECT COUNT(*) FROM cool.order WHERE payStatus = 1'
    );
    res['unpayOrder'] = await this.OrderEntity.query(
      'SELECT COUNT(*) FROM cool.order WHERE payStatus = 0'
    );
    return res;
  }

  async getAreaAmount() {
    const res = await this.OrderEntity.query(
      'SELECT address, SUM(orderAmount) FROM cool.order WHERE payStatus = 1 GROUP BY address'
    );
    return res;
  }

  //获取每个月的销售额
  async getMonthAmount() {
    const res = await this.OrderEntity.query(
      'SELECT DATE_FORMAT(createTime, "%Y-%m") AS month, SUM(orderAmount) FROM cool.order WHERE payStatus = 1 GROUP BY month'
    );
    return res;
  }

  //订单商品类别销售额
  async getCategoryAmount() {
    const res = await this.OrderEntity.query(
      'SELECT orderType, SUM(orderAmount) FROM cool.order WHERE payStatus = 1 GROUP BY orderType'
    );
    return res;
  }
}
