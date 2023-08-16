import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DbModule } from '@app/db'

@Module({
  imports: [DbModule],

  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}