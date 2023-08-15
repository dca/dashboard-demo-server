import { UserRepository } from '@app/db/repository/user.repository'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { JwtPayload } from './jwt-payload.interface'
import { User } from '@prisma/client'

interface LoginResponseDto {
  email: string
  sub: string
  access_token: string
}

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
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
    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      email: user.email,
      sub: user.id,
      access_token: this.jwtService.sign(payload, { secret: 'jwt.secret1111' })
    }
  }
}
