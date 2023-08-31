import { Injectable, Logger } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import * as AWS from 'aws-sdk'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  private readonly transporter: nodemailer.Transporter

  constructor (
    private readonly configService: ConfigService
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

    await this._sendMail(options)
  }

  private async _sendMail (options: nodemailer.SendMailOptions): Promise<any> {
    const response = await new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (err, info) => {
        if (err !== null) {
          this.logger.error(err)
          reject(err)
        } else {
          this.logger.log(info.envelope)
          this.logger.log(info.messageId)
          resolve(info)
        }
      })
    })
    return response
  }
}
