import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserRepository } from '@app/db/repository/user.repository'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService
  let mockUserRepository: Partial<UserRepository>
  let mockJwtService: Partial<JwtService>

  beforeEach(async () => {
    mockUserRepository = {
      findUnique: jest.fn()
    }

    mockJwtService = {
      sign: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
