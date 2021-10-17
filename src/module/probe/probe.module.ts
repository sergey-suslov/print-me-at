import { Module } from '@nestjs/common'
import { ProbeService } from './probe.service'
import { ProbeController } from './probe.controller'

@Module({
  providers: [ProbeService],
  exports: [ProbeService],
  controllers: [ProbeController],
})
export class ProbeModule {}
