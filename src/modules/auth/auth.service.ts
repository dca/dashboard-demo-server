import { UserRepository } from '@app/db/repository/user.repository'
import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { JwtPayload } from './jwt-payload.interface'
import { User } from '@prisma/client'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { UserLoginEvent } from '@src/events/user-login.event'
import { UserSessionRepository } from '@app/db/repository/user-session.repository'

interface LoginResponseDto {
  email: string
  sub: string
  access_token: string
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor (
    private readonly eventEmitter: EventEmitter2,
    private readonly userRepository: UserRepository,
    private readonly userSessionRepository: UserSessionRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findUnique({
      where: { email }
    })

    if (user != null && (await argon2.verify(user.password, password))) {
      return user
    }
    return null
  }

  async validateUserByJwt (payload: JwtPayload): Promise<User | null> {
    return await this.userRepository.findUnique({ where: { id: payload.sub } })
  }

  async validateUserByGoogle (profile: any): Promise<any> {
    return profile
  }

  async login (user: any): Promise<LoginResponseDto> {
    this.logger.log(`login user: ${JSON.stringify(user)}`)
    // emmit login event
    this.eventEmitter.emit('user.login', new UserLoginEvent({ id: user.id }))

    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      email: user.email,
      sub: user.id,
      access_token: this.jwtService.sign(payload, { secret: 'jwt.secret1111' })
    }
  }

  @OnEvent('user.login', { async: true })
  async handleUserLoginEvent (payload: UserLoginEvent): Promise<void> {
    // update user login count
    await this.userRepository.incrementUserLoginCount(payload.id)

    // update user last session
    await this.userSessionRepository.upsertUserSession(payload.id)
  }
}
