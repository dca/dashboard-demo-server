import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { AuthService } from './auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor (private readonly authService: AuthService) {
    super({
      clientID: 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile']
    })
  }

  async validate (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function
  ): Promise<any> {
    const user: any = await this.authService.validateUserByGoogle(profile)
    if (user === null || user === undefined) {
      throw new UnauthorizedException()
    }
    return done(null, user)
  }
}
