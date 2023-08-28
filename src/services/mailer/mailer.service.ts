import { Injectable, Logger } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import * as AWS from 'aws-sdk'
import { promisify } from 'util'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  private readonly transporter: nodemailer.Transporter
  configService: any

  constructor (
    configService: ConfigService
  ) {
    const ses = new AWS.SES({
      apiVersion: '2010-12-01',
      region: 'us-east-1'
    })

    this.transporter = nodemailer.createTransport({
      SES: { ses, aws: AWS.SES }
    })
  }

  async sendMail (options: nodemailer.SendMailOptions): Promise<any> {
    const defaultOptions: nodemailer.SendMailOptions = {
      from: this.configService.get('MAILER_FROM') as string,
      to: undefined,
      subject: undefined,
      text: undefined
    }

    options = { ...defaultOptions, ...options }

    try {
      const sendMailPromisified = promisify(this.transporter.sendMail).bind(this.transporter)
      const info = await sendMailPromisified(options)
      this.logger.log(info.envelope)
      this.logger.log(info.messageId)
    } catch (err) {
      this.logger.error(err)
    }
  }
}
