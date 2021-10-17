import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { SCHEDULED_MESSAGES } from '../common/constants'
import { MessageScheduler } from './interface/message-scheduler.interface'

@Injectable()
export class MessageSchedulerService implements MessageScheduler {
  constructor(
    @InjectQueue(SCHEDULED_MESSAGES)
    private readonly scheduledMessagesQueue: Queue,
  ) {}

  async scheduleMessage(message: string, time: Date): Promise<void> {
    await this.scheduledMessagesQueue.add(
      {
        message,
        time: time.getTime(),
      },
      { delay: Math.max(0, time.getTime() - Date.now()) },
    )
  }
}
