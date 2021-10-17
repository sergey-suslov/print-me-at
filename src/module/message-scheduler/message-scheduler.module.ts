import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { SCHEDULED_MESSAGES } from '../common/constants'
import { MessageSchedulerService } from './message-scheduler.service'
import { MessageSchedulerProcessor } from './messsage-scheduler.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: SCHEDULED_MESSAGES,
    }),
  ],
  providers: [MessageSchedulerService, MessageSchedulerProcessor],
  exports: [MessageSchedulerService],
})
export class MessageSchedulerModule {}
