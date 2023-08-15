import { Injectable } from '@nestjs/common'
import { UserRepository } from '@app/db/repository/user.repository'
import * as argon2 from 'argon2'
import { PrismaService } from '@app/db/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository
  ) {}

  async createUser (email: string, password: string): Promise<User> {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id
    })

    return await this.userRepository.create({
      email,
      password: hashedPassword
    })
  }
}
