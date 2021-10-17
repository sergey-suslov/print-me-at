import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: (config: ConfigService) => {
        const redisPort = config.get<number>('REDIS_PORT')
        const redisHost = config.get<string>('REDIS_HOST')
        const connection = new Redis(redisPort, redisHost)
        return connection
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
