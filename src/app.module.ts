import { Module } from '@nestjs/common'
import { PrinterModule } from './module/printer/printer.module'
import { ProbeModule } from './module/probe/probe.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [SharedModule, ProbeModule, PrinterModule],
})
export class AppModule {}
