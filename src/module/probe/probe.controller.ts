import { Controller, Get, Inject, Res } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { CustomLoggerService } from '../../shared/helper/custom-logger.service'
import { ProbeService } from './probe.service'

@Controller('probe')
export class ProbeController {
  constructor(
    private readonly logger: CustomLoggerService,
    @Inject(ProbeService)
    private readonly probeService: ProbeService,
  ) {}

  @Get('/liveness')
  liveness(@Res() res: FastifyReply) {
    res.status(200).send('ok')
  }

  @Get('/readiness')
  async readiness(@Res() res: FastifyReply) {
    let check = false

    try {
      check = await this.probeService.check()
      // eslint-disable-next-line no-empty
    } catch (e) {
      this.logger.error({
        msg: 'residence.readiness',
        err: e,
      })
    }

    if (check) {
      res.status(200).send('ok')
      return
    }
    const error = {
      check,
    }
    this.logger.error(error)
    res.status(500).send(error)
  }
}
