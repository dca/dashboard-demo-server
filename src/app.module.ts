import { OtelModule } from '@app/otel'
import { DbModule } from '@app/db'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [OtelModule, DbModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
