import { Injectable } from '@nestjs/common'
import { UserRepository } from '@app/db/repository/user.repository'
import * as argon2 from 'argon2'
import { PrismaService } from '@app/db/prisma/prisma.service'
import { User, UserSession } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid' // 用於生成驗證令牌
import { UserSessionRepository } from '@app/db/repository/user-session.repository'
// import { MailService } from 'path-to-your-mail-service' // 你的郵件服務

@Injectable()
export class UserService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly userSessionRepository: UserSessionRepository
    // private readonly mailService: MailService // 注入你的郵件服務
  ) {}

  async createUser (email: string, password: string): Promise<User> {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id
    })

    // 生成驗證令牌
    const verificationToken = uuidv4()

    // 創建用戶並存儲驗證令牌和其過期時間
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24小時後過期
    })

    // 發送驗證郵件
    // const verificationLink = `https://yourdomain.com/verify?token=${verificationToken}`
    // await this.mailService.sendVerificationEmail(email, verificationLink)

    return user
  }

  async getAllUsers (): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }

  async getActiveSessionsToday (): Promise<number> {
    return await this.userSessionRepository.getActiveSessionsToday()
  }

  async getAverageActiveSessionsLast7Days (): Promise<number> {
    const average = await this.userSessionRepository.getAverageActiveSessionsLast7Days()
    return average
  }

  async createSession (userId: number): Promise<UserSession> {
    return await this.userSessionRepository.createSession(userId)
  }
}
