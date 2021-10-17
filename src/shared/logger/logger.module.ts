import { Options } from 'pino-http'
import { LoggerModule } from 'nestjs-pino'
import { Module } from '@nestjs/common'

export const loggerConfig: Options = {
  name: process.env.SERVICE_NAME,
  formatters: {
    level: (level) => ({ level }),
  },
  level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
  prettyPrint: process.env.NODE_ENV !== 'production',
  timestamp: process.env.NODE_ENV !== 'production',
}

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: loggerConfig,
    }),
  ],
  providers: [],
})
export class LoggerInitModule {}
