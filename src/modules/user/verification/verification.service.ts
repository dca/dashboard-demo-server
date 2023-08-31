import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { UserCreatedEvent } from '@src/events/user-created.event'
import { MailerService } from '@src/services/mailer/mailer.service'

@Injectable()
export class VerificationService {
  constructor (
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailerService: MailerService
  ) { }

  @OnEvent('user.created', { async: true })
  async handleUserCreatedEvent (payload: UserCreatedEvent): Promise<void> {
    await this.sendVerificationEmail(payload.email, payload.id, payload.verificationToken)
  }

  @OnEvent('user.verification', { async: true })
  async handleUserVerificationEvent (payload: UserCreatedEvent): Promise<void> {
    await this.sendVerificationEmail(payload.email, payload.id, payload.verificationToken)
  }

  //
  async sendVerificationEmail (email: string, uid: number, code: string): Promise<void> {
    const baseURL = this.configService.get<string>('BASE_URL') ?? 'http://localhost:3001'
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email address',
      text: `Your verification code is ${code}, link: ${baseURL}/verify?uid=${uid}&code=${code}`
    })
  }
}
