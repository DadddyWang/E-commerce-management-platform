import { Provide, Get, Inject, Controller } from '@midwayjs/decorator';
import { BaseController } from '@cool-midway/core';
import { DashboardService } from '../../service/dashboard';

/**
 * 描述
 */
@Provide()
@Controller('/dashboard')
export class DashboardController extends BaseController {
  @Inject()
  service: DashboardService;

  @Get('/totalAmount', { summary: '总销售额' })
  async getTotalAmount() {
    return this.ok(await this.service.getTotalAmount());
  }

  @Get('/totalOrder', { summary: '总订单数' })
  async getTotalOrder() {
    return this.ok(await this.service.getTotalOrder());
  }

  //各地销售额数据
  @Get('/areaAmount', { summary: '各地销售额' })
  async getAreaAmount() {
    const res = await this.service.getAreaAmount();
    return this.ok(res);
  }
}
