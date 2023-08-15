import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { Span } from '@amplication/opentelemetry-nestjs'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Span()
  @Get()
  async getHello (): Promise<string> {
    return await this.appService.getHello()
  }

  @Span()
  @Get('hello/:name')
  async asyncgetHello2 (@Param('name') name): Promise<string> {
    return await this.appService.getHello(name)
  }
}
