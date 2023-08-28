import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { UserCreatedEvent } from '@src/events/user-created.event'
import { MailerService } from '@src/services/mailer/mailer.service'

@Injectable()
export class VerificationService {
  constructor (
    private readonly eventEmitter: EventEmitter2,
    private readonly mailerService: MailerService
  ) { }

  @OnEvent('user.created', { async: true })
  async handleUserCreatedEvent (payload: UserCreatedEvent): Promise<void> {
    await this.sendVerificationEmail(payload.email, payload.verificationToken)
  }

  @OnEvent('user.verification', { async: true })
  async handleUserVerificationEvent (payload: UserCreatedEvent): Promise<void> {
    await this.sendVerificationEmail(payload.email, payload.verificationToken)
  }

  //
  async sendVerificationEmail (email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email address',
      text: `Your verification code is ${code}, link: http://localhost:3000/verify?code=${code}`
    })
  }
}
