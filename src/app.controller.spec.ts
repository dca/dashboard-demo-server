import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OtelModule } from '@app/otel'
import { DbModule } from '@app/db'
import { UserModule } from './modules/user/user.module'
import { ConfigService } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MailerModule } from './services/mailer/mailer.module'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule,
        OtelModule,
        DbModule,
        UserModule,
        MailerModule
      ],
      controllers: [AppController],
      providers: [AppService, ConfigService]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })
})
