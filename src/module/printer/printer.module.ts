import { Module } from '@nestjs/common'
import { PrinterService } from './printer.service'
import { PrinterController } from './printer.controller'
import { MessageSchedulerModule } from '../message-scheduler/message-scheduler.module'

@Module({
  imports: [MessageSchedulerModule],
  providers: [PrinterService],
  controllers: [PrinterController],
})
export class PrinterModule {}
