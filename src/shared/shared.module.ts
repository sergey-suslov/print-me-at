import { Global, Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { CustomLoggerService } from './helper/custom-logger.service'
import { LoggerInitModule } from './logger/logger.module'

@Global()
@Module({
  providers: [CustomLoggerService],
  imports: [ConfigModule, LoggerInitModule],
  exports: [CustomLoggerService],
})
export class SharedModule {}
