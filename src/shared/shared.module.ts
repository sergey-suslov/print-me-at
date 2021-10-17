import { Global, Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { CustomLoggerService } from './helper/custom-logger.service'
import { LoggerInitModule } from './logger/logger.module'
import { RedisModule } from './redis/redis.module'

@Global()
@Module({
  providers: [CustomLoggerService],
  imports: [ConfigModule, LoggerInitModule, RedisModule],
  exports: [CustomLoggerService],
})
export class SharedModule {}
