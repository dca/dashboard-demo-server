import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from './mailer.service'
import { ConfigService } from '@nestjs/config'

describe('MailerService', () => {
  let service: MailerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ConfigService,
        MailerService
      ]
    }).compile()

    service = module.get<MailerService>(MailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
