import { Controller, Post, Body, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from '@prisma/client'
import { ActiveSessionsResponse } from './response/active-sessions.response'

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

  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  async getAllUsers (): Promise<Array<Partial<User>>> {
    return await this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user session statistics' })
  @Get('session-statistics')
  async getSessionStatistics (): Promise<ActiveSessionsResponse> {
    const today = await this.userService.getActiveSessionsToday()
    const averageLast7Days = await this.userService.getAverageActiveSessionsLast7Days()

    return {
      today,
      averageLast7Days
    }
  }
}
