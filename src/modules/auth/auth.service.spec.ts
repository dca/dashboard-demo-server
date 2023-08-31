import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserRepository } from '@app/db/repository/user.repository'
import { JwtService } from '@nestjs/jwt'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserSessionRepository } from '@app/db/repository/user-session.repository'

describe('AuthService', () => {
  let service: AuthService
  let mockUserRepository: Partial<UserRepository>
  let mockUserSessionRepository: Partial<UserSessionRepository>
  let mockJwtService: Partial<JwtService>

  beforeEach(async () => {
    mockUserRepository = {
      findUnique: jest.fn()
    }

    mockUserSessionRepository = {
      upsertUserSession: jest.fn()
    }

    mockJwtService = {
      sign: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        EventEmitter2,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: UserSessionRepository, useValue: mockUserSessionRepository },
        { provide: JwtService, useValue: mockJwtService }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
