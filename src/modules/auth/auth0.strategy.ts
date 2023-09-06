import { UserRepository } from '@app/db/repository/user.repository'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy } from 'passport-auth0'

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  private readonly logger = new Logger(Auth0Strategy.name)

  constructor (
    private readonly userRepository: UserRepository
  ) {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL ?? ''}/callback`,
      scope: 'openid email profile',
      state: false
    })
  }

  async validate (accessToken: string, refreshToken: string, extraParams: any, profile: any): Promise<Partial<User>> {
    if (accessToken === undefined || extraParams.user_id === undefined) {
      throw new UnauthorizedException()
    }

    const userId = extraParams.user_id
    let user = await this.userRepository.findUnique({ where: { email: userId } })

    if (user === null) {
      // TODO add upsert
      user = await this.userRepository.create({
        email: userId,
        password: '',
        isVerified: true
      })
    }

    return user
  }
}
