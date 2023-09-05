import { DbModule } from '@app/db'
import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '@src/modules/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { Auth0Strategy } from './auth0.strategy'

@Module({
  imports: [
    DbModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    Auth0Strategy,
    JwtStrategy,
    JwtService
  ]
})
export class AuthModule {}
