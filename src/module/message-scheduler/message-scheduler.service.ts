import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { MessageScheduler } from './interface/message-scheduler.interface'

@Injectable()
export class MessageSchedulerService implements MessageScheduler {
  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  async scheduleMessage(message: string, time: Date): Promise<void> {
    await this.redis.zadd('scheduledMessages', [time.getTime(), message])
  }
}
