import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CustomLoggerService } from './shared/helper/custom-logger.service'

async function bootstrap() {
  const logger = new CustomLoggerService()
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger },
  )
  const config = app.get(ConfigService)

  const env = config.get<string>('NODE_ENV')
  logger.log(`Starting in ${env} mode`)

  // request body validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  setUpSwagger(app)

  process.on('unhandledRejection', (err: any) => {
    logger.error({
      msg: 'Unhandled rejection!',
      originalMsg: err?.message,
      err,
    })
  })

  const httpPort = config.get<number>('HTTP_PORT')
  if (!httpPort) {
    logger.error('No http port is provided. Http port is required')
    return
  }
  await app.listen(httpPort, '0.0.0.0', () => {
    logger.log(`HTTP listening on ${httpPort}`)
  })
}

function setUpSwagger(app: NestFastifyApplication) {
  const options = new DocumentBuilder()
    .setTitle('MenHealth mobile API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('files/swagger', app, document)
}

bootstrap()
