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
}
