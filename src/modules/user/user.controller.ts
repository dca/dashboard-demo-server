import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from '@prisma/client'
import { ActiveSessionsResponse } from './response/active-sessions.response'
import { UpdateUserDto } from './dto/update-user.dto'
import { CustomResponseWrapper } from '@src/utils/custom-response-wrapper'

@ApiTags('user')
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor (private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Get user session statistics' })
  @Get('statistics')
  @ApiResponse({
    status: 200,
    description: 'The user session statistics',
    type: CustomResponseWrapper(ActiveSessionsResponse)
  })
  async getSessionStatistics (): Promise<ActiveSessionsResponse> {
    const today = await this.userService.getActiveSessionsToday()
    const averageLast7Days = await this.userService.getAverageActiveSessionsLast7Days()

    return {
      today,
      averageLast7Days
    }
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register (@Body() { email, password }: CreateUserDto): Promise<{ id: number, email: string }> {
    return await this.userService.createUser(email, password)
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers (): Promise<Array<Partial<User>>> {
    return await this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  async getUserById (@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
    return await this.userService.getUserById(id)
  }

  @ApiOperation({ summary: 'Update user password' })
  @Patch(':id')
  async updateUserPassword (@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<void> {
    await this.userService.updateUserPassword(id, dto)
  }
}
