import { DbModule } from '@app/db'
import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/modules/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    DbModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jwt.secret1111',
      signOptions: { expiresIn: '600s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtService, JwtStrategy]
})
export class AuthModule {}
