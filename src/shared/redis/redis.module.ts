import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const redisPort = config.get<number>('REDIS_PORT')
        const redisHost = config.get<string>('REDIS_HOST')
        return {
          redis: {
            host: redisHost,
            port: redisPort,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
