import { Injectable, NotImplementedException } from '@nestjs/common'
import { MessageScheduler } from './interface/message-scheduler.interface'

@Injectable()
export class MessageSchedulerService implements MessageScheduler {
  scheduleMessage(message: string, time: Date): Promise<void> {
    throw new NotImplementedException()
  }
}
