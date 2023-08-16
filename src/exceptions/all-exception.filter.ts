import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name)

  catch (exception: HttpException, host: ArgumentsHost): void {
    //
    this.logger.error(exception)
  }
}
