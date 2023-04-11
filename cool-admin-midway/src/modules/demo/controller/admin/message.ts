import { BaseController, CoolController } from '@cool-midway/core';
import { Get, Inject } from '@midwayjs/core';
import { MessageEntity } from '../../entity/message';
import { MessageService } from '../../service/message';
import { Context } from '@midwayjs/koa';

/**
 * 消息管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'page', 'list'],
  entity: MessageEntity,
})
export class MessageController extends BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  messageService: MessageService;

  @Get('/message_list')
  async getMessageList() {
    const res = await this.messageService.getMessageList(
      this.ctx.admin.user.id
    );
    return this.ok(res);
  }
}
