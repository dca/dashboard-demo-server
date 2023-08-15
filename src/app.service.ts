import { Traceable } from '@amplication/opentelemetry-nestjs'
import { PrismaService } from '@app/db/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Traceable()
@Injectable()
export class AppService {
  constructor (private readonly prismaService: PrismaService) {}
  async getHello (name = ''): Promise<string> {
    return `Hello World! ${name}`
  }
}
