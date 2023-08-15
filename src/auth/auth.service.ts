import { UserRepository } from '@app/db/repository/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,

  ) { }

  async validateUser(email: string, password: string) {
    console.log('AuthService.validateUser')
    const user = await this.userRepository.findUnique({
      where: { email: email },
    });

    if (user && await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findUnique({ where: { id: payload.sub } })
  }

  async validateUserByGoogle(profile: any): Promise<any> {
    return profile;
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      email: user.email,
      sub: user.id,
      access_token: this.jwtService.sign(payload, { secret: 'jwt.secret1111' }),
    };
  }
}
