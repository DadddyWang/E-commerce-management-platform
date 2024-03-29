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

    res['totalAmount'] = (
      await this.OrderEntity.query(
        'SELECT SUM(orderAmount) as totalAmount FROM cool.order WHERE payStatus = 1'
      )
    )[0]['totalAmount'];
    res['todayAmount'] = (
      await this.OrderEntity.query(
        'SELECT SUM(orderAmount) as todayAmount FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m-%d") = CURDATE()'
      )
    )[0]['todayAmount'];
    res['yesterdayAmount'] = (
      await this.OrderEntity.query(
        'SELECT SUM(orderAmount) as yesterdayAmount FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m-%d") = DATE_SUB(CURDATE(), INTERVAL 1 DAY)'
      )
    )[0]['yesterdayAmount'];
    return res;
  }

  async getTotalOrder() {
    //拿到未支付的订单笔数与已支付的订单笔数
    const res = {};
    res['payOrder'] = (
      await this.OrderEntity.query(
        'SELECT COUNT(*) as payOrder FROM cool.order WHERE payStatus = 1'
      )
    )[0]['payOrder'];
    res['unpayOrder'] = (
      await this.OrderEntity.query(
        'SELECT COUNT(*) as unpayOrder FROM cool.order WHERE payStatus = 0'
      )
    )[0]['unpayOrder'];
    return res;
  }

  //拿到各地区今日 本周 本月 全年的销售额
  async getAreaAmount() {
    const res = {};
    //地区字段是address
    res['todayAmount'] = await this.OrderEntity.query(
      'SELECT address, SUM(orderAmount) as todayAmount FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m-%d") = CURDATE() GROUP BY address'
    );
    res['weekAmount'] = await this.OrderEntity.query(
      'SELECT address, SUM(orderAmount) as weekAmount FROM cool.order WHERE payStatus = 1 AND YEARWEEK(DATE_FORMAT(createTime, "%Y-%m-%d")) = YEARWEEK(NOW()) GROUP BY address'
    );
    res['monthAmount'] = await this.OrderEntity.query(
      'SELECT address, SUM(orderAmount) as monthAmount FROM cool.order WHERE payStatus = 1 AND DATE_FORMAT(createTime, "%Y-%m") = DATE_FORMAT(CURDATE(), "%Y-%m") GROUP BY address'
    );
    res['yearAmount'] = await this.OrderEntity.query(
      'SELECT address, SUM(orderAmount) as yearAmount FROM cool.order WHERE payStatus = 1 AND YEAR(createTime) = YEAR(NOW()) GROUP BY address'
    );
    return res;
  }

  //获取每个月的销售额
  async getMonthAmount() {
    const res = await this.OrderEntity.query(
      'SELECT DATE_FORMAT(createTime, "%Y-%m") AS month, SUM(orderAmount) as monthAmount FROM cool.order WHERE payStatus = 1 GROUP BY month'
    );
    return res;
  }

  //订单商品类别销售额
  async getCategoryAmount() {
    const res = await this.OrderEntity.query(
      'SELECT orderType, SUM(orderAmount) as categoryAmount FROM cool.order WHERE payStatus = 1 GROUP BY orderType'
    );
    return res;
  }

  //发货情况
  async getDelivery() {
    const res = {};
    res['delivery'] = await this.OrderEntity.query(
      'SELECT shipmentStatus, COUNT(*) as number FROM cool.order GROUP BY shipmentStatus'
    );
    return res;
  }
}
