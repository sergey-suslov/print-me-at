import { Processor, Process } from '@nestjs/bull'
import { random } from 'lodash'
import { Job } from 'bull'
import { CustomLoggerService } from '../../shared/helper/custom-logger.service'
import { SCHEDULED_MESSAGES } from '../common/constants'
import { PrintMessagePayload } from '../printer/interface/printer.interface'

@Processor(SCHEDULED_MESSAGES)
export class MessageSchedulerProcessor {
  constructor(private readonly logger: CustomLoggerService) {}

  @Process()
  async transcode(job: Job<PrintMessagePayload>) {
    this.logger.log(`Scheduled message: ${job.data.message}`)
    // Immitating work
    await new Promise((res) => setTimeout(res, random(1000, 3000)))
    return {}
  }
}
