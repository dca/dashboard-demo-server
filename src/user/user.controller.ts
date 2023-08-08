import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiProperty, ApiBody } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(email, password);
  }
}
