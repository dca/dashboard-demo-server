import { DbModule } from '@app/db'
import { OtelModule } from '@app/otel'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { MailerModule } from './services/mailer/mailer.module'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { DataTransformInterceptor } from './interceptors/transform.interceptor'

import { AllExceptionFilter } from './exceptions/all-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    OtelModule,
    DbModule,
    AuthModule,
    UserModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataTransformInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },

    AppService
  ]
})
export class AppModule { }
