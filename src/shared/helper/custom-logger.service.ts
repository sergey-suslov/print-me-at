import { Injectable, Scope, LoggerService } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { v4 } from 'uuid'
import { loggerConfig } from '../logger/logger.module'

@Injectable({ scope: Scope.REQUEST })
export class CustomLoggerService implements LoggerService {
  logger: PinoLogger
  id: string

  constructor() {
    this.logger = new PinoLogger({
      pinoHttp: loggerConfig,
    })
    this.id = v4()
  }

  debug(message: any, context?: string): void {
    this.logger.debug({
      msg: message,
      context,
      reqId: this.id,
    })
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.error({
      msg: message,
      context,
      trace,
      reqId: this.id,
    })
  }

  log(message: any, context?: string): any {
    this.logger.info({
      msg: message,
      context,
      reqId: this.id,
    })
  }

  setContext(context: string): void {
    this.logger.setContext(context)
  }

  verbose(message: any, context?: string): void {
    this.logger.trace({
      msg: message,
      context,
      reqId: this.id,
    })
  }

  warn(message: any, context?: string): any {
    this.logger.warn({
      msg: message,
      context,
      reqId: this.id,
    })
  }
}
