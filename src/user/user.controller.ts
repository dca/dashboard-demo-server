import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register (@Body() { email, password }: CreateUserDto): Promise<{ id: number, email: string }> {
    return await this.userService.createUser(email, password)
  }
}
