import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

Error.stackTraceLimit = 100

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {})
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    //
  })

  app.enableVersioning()

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Demo APIs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
  .then(() => { console.log('Server is running on port 3000') })
  .catch((err) => { console.log(err) })
