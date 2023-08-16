import { OtelModule } from '@app/otel'
import { DbModule } from '@app/db'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
// import { APP_FILTER } from '@nestjs/core'
// import { HttpExceptionFilter } from './exceptions/http-exception.filter'
// import { AllExceptionFilter } from './exceptions/all-exception.filter'

@Module({
  imports: [
    OtelModule,
    DbModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter
    // },
    AppService
  ]
})
export class AppModule { }
