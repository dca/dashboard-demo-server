import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DbModule } from '@app/db'
import { VerificationService } from './verification/verification.service'
import { MailerModule } from '@src/services/mailer/mailer.module'

@Module({
  imports: [
    MailerModule,
    DbModule
  ],
  providers: [UserService, VerificationService],
  controllers: [UserController]
})
export class UserModule {}
