import { Test, TestingModule } from '@nestjs/testing'
import { VerificationService } from './verification.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MailerService } from '@src/services/mailer/mailer.service'
import { ConfigService } from '@nestjs/config'

describe('VerificationService', () => {
  let service: VerificationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        EventEmitter2,
        MailerService,
        VerificationService
      ]
    }).compile()

    service = module.get<VerificationService>(VerificationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
