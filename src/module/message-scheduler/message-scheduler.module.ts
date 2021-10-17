import { Module } from '@nestjs/common'
import { MessageSchedulerService } from './message-scheduler.service'

@Module({
  providers: [MessageSchedulerService],
  exports: [MessageSchedulerService],
})
export class MessageSchedulerModule {}
