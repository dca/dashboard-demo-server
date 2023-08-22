import { Test, TestingModule } from '@nestjs/testing'
import * as argon2 from 'argon2'

import { UserService } from './user.service'
import { PrismaService } from '@app/db/prisma/prisma.service'
import { UserSessionRepository } from '@app/db/repository/user-session.repository'
import { UserRepository } from '@app/db/repository/user.repository'

type MockedProvider<T> = {
  [P in keyof T]: T[P] & jest.Mock;
}

describe('UserService', () => {
  let service: UserService
  let mockUserRepository: MockedProvider<Partial<UserRepository>>
  let mockUserSessionRepository: MockedProvider<Partial<UserSessionRepository>>
  let mockPrismaService: MockedProvider<Partial<PrismaService>>

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      getAllUsers: jest.fn(),
      findUnique: jest.fn()
    }

    mockUserSessionRepository = {
      getActiveSessionsToday: jest.fn(),
      getAverageActiveSessionsLast7Days: jest.fn(),
      createSession: jest.fn()
    }

    mockPrismaService = {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: UserSessionRepository, useValue: mockUserSessionRepository },
        { provide: PrismaService, useValue: mockPrismaService }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should create a user', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: await argon2.hash('password123'),
      isVerified: false
    }

    if (mockUserRepository.create != null) {
      mockUserRepository.create.mockResolvedValueOnce(mockUser)
    }

    const result = await service.createUser('test@example.com', 'password123')
    expect(result).toEqual(mockUser)
  })
})
