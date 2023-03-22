import { BaseController, CoolController } from '@cool-midway/core';
import { MessageEntity } from '../../entity/message';

/**
 * 订单管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'page', 'list'],
  entity: MessageEntity,
})
export class MessageController extends BaseController {}
