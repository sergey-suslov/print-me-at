import { Inject, Injectable } from '@nestjs/common'
import { CustomLoggerService } from '../../shared/helper/custom-logger.service'
import { ScheduleMessageError } from '../common/schedule-message-error'
import { MessageScheduler } from '../message-scheduler/interface/message-scheduler.interface'
import { MessageSchedulerService } from '../message-scheduler/message-scheduler.service'
import { Printer, PrintMessagePayload } from './interface/printer.interface'

@Injectable()
export class PrinterService implements Printer {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(MessageSchedulerService)
    private readonly messageScheduler: MessageScheduler,
  ) {}

  async printAt(
    payload: PrintMessagePayload,
  ): Promise<void | ScheduleMessageError> {
    try {
      await this.messageScheduler.scheduleMessage(payload.message, payload.time)
    } catch (error) {
      console.log(error)
      this.logger.error({
        msg: 'Error scheduling message',
        error: error.message,
      })
      return new ScheduleMessageError()
    }
  }
}
