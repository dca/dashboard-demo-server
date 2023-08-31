import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name)

  catch (exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = typeof exception.getStatus === 'function' ? exception.getStatus() : 500

    const errorResponse = {
      success: false,
      error: exception.name ?? 'Internal Server Error',
      message: exception.message ?? null
    }

    this.logger.error(`HTTP Status: ${status} Error: ${JSON.stringify(errorResponse)}, stack: ${exception.stack ?? ''}`)

    response.status(status).json(errorResponse)
  }
}
