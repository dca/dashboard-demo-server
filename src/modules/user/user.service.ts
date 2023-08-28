import { PrismaService } from '@app/db/prisma/prisma.service'
import { UserSessionRepository } from '@app/db/repository/user-session.repository'
import { UserRepository } from '@app/db/repository/user.repository'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { User, UserSession } from '@prisma/client'
import * as argon2 from 'argon2'
import { v4 as uuidv4 } from 'uuid'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserCreatedEvent } from '@src/events/user-created.event'

@Injectable()
export class UserService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly userRepository: UserRepository,
    private readonly userSessionRepository: UserSessionRepository
    // private readonly mailService: MailService // inject the mail service
  ) { }

  async createUser (email: string, password: string): Promise<User> {
    // create a verification token
    const verificationToken: string = uuidv4()

    // create the user
    const user = await this.userRepository.create({
      email,
      password: await this.hashPassword(password),
      isVerified: false,
      verificationToken,
      verificationTokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24小時後過期
    })

    this.eventEmitter.emit('user.created', new UserCreatedEvent({
      id: user.id,
      email: user.email,
      verificationToken
    }))

    // TODO: send verification email
    // const verificationLink = `https://yourdomain.com/verify?token=${verificationToken}`
    // await this.mailService.sendVerificationEmail(email, verificationLink)

    return user
  }

  async updateUserPassword (id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { currentPassword, newPassword } = updateUserDto

    // check if the user exists
    const user = await this.userRepository.findUnique({ where: { id } })
    if (user == null) {
      throw new NotFoundException()
    }

    // check if the current password is correct
    const isPasswordValid = await argon2.verify(user.password, currentPassword)
    if (!isPasswordValid) {
      throw new ForbiddenException('The current password is incorrect')
    }

    // update the password
    const updatedUser = await this.userRepository.updateById(id, {
      password: await this.hashPassword(newPassword)
    })

    return updatedUser
  }

  async getAllUsers (): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }

  async getUserById (id: number): Promise<User> {
    const user = await this.userRepository.findUnique({ where: { id } })
    if (user == null) {
      throw new NotFoundException()
    }
    return user
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

  private async hashPassword (password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id
    })
  }
}
