import { BaseController, CoolController } from '@cool-midway/core';
import { OrderEntity } from '../../entity/order';

/**
 * 订单管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'page', 'list'],
  entity: OrderEntity,
})
export class OrderController extends BaseController {}
