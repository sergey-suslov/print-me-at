import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { performance } from 'perf_hooks'
import { CustomLoggerService } from '../helper/custom-logger.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timer = performance.now()
    let headers: Record<string, unknown>
    try {
      headers = {
        // eslint-disable-next-line no-underscore-dangle
        ...context.getArgs()[1]._internal_repr,
      }
      delete headers['auth-token']
    } catch (e) {
      this.logger.debug({
        msg: 'There is no headers',
      })
    }
    const controller = context.getClass().name
    if (controller === 'ProbeController') {
      return next.handle()
    }
    this.logger.log(
      {
        type: 'REQUEST',
        handler: context.getHandler().name,
        controller,
        headers,
      },
      process.env.SERVICE_NAME,
    )
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          {
            type: 'RESPONSE',
            handler: context.getHandler().name,
            controller,
            timeSpent: (performance.now() - timer).toFixed(2),
          },
          process.env.SERVICE_NAME,
        )
      }),
    )
  }
}
