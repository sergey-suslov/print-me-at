import * as os from 'os'
import { Module } from '@nestjs/common'
import * as Joi from '@hapi/joi'
import { ConfigModule as Config } from '@nestjs/config'
import { v4 as uuid } from 'uuid'

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? 'config/production.env'
          : process.env.NODE_ENV === 'test'
          ? 'config/e2e.env'
          : process.env.NODE_ENV === 'development'
          ? 'config/development.env'
          : 'config/development.env',

      /**
       * Additional configuration provider to add array values
       * TODO move to yaml or any other array friendly configuration format
       * */
      validationSchema: Joi.object({
        /**
         * General
         * */
        SERVICE_NAME: Joi.string().default('PRINT_ME_AT'),
        POD_NAME: Joi.string().default(os.hostname() || uuid()),
        APP_NAME: Joi.string().default('print-me-at'),
        RELEASE_TYPE: Joi.string().default('main'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        HTTP_PORT: Joi.number().default(8080),
      }),
    }),
  ],
})
export class ConfigModule {}
