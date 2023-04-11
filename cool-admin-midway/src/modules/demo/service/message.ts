import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { MessageEntity } from '../entity/message';
import { Repository } from 'typeorm';

/**
 * 缓存
 */
@Provide()
export class MessageService extends BaseService {
  @InjectEntityModel(MessageEntity)
  messageEntity: Repository<MessageEntity>;

  async getMessageList(userId) {
    const res = await this.messageEntity.find({
      where: {
        receiver_id: userId,
      },
    });
    return res;
  }
}
