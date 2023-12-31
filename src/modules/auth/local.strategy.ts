import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate (email: string, password: string): Promise<any> {
    console.log('LocalStrategy.validate')
    const user = await this.authService.validateUser(email, password)
    if (user == null) {
      throw new UnauthorizedException() // user not found
    }
    // if (user.isVerified === null) {
    //   throw new UnauthorizedException('Please verify your email first')
    // }

    return user
  }
}
