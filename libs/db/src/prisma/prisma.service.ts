import { Traceable } from '@amplication/opentelemetry-nestjs'
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

interface LogData {
  query: string
  params: string
  duration: number
}

@Injectable()
@Traceable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor () {
    super({
      log: [
        {
          emit: 'event',
          level: 'query'
        },
        {
          emit: 'stdout',
          level: 'error'
        },
        {
          emit: 'stdout',
          level: 'info'
        },
        {
          emit: 'stdout',
          level: 'warn'
        }
      ]
    })

    // (this.$on as any)('query', this.log.bind(this))
  }

  async onModuleInit (): Promise<void> {
    await this.$connect()
  }

  async onModuleDestroy (): Promise<void> {
    await this.$disconnect()
  }

  private async log (e: LogData): Promise<void> {
    this.logger.debug(
      `log: Query: ${e.query} with Params: ${e.params}, took ${e.duration}ms`
    )
  }
}
