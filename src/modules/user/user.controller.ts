import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from '@prisma/client'
import { ActiveSessionsResponse } from './response/active-sessions.response'
import { UpdateUserDto } from './dto/update-user.dto'
import { CustomResponseWrapper } from '@src/utils/custom-response-wrapper'
import { UserQueryDTO } from './dto/query-user.dto'
import { PaginatedResponse, Pagination } from '@src/utils/pagination'
import { UserResponse } from '@app/db/repository/user.repository'
import { VerificationDto } from './dto/verification.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('user')
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor (private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Get user session statistics' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The user session statistics',
    type: CustomResponseWrapper(ActiveSessionsResponse)
  })
  @Get('statistics')
  async getSessionStatistics (): Promise<ActiveSessionsResponse> {
    const today = await this.userService.getActiveSessionsToday()
    const averageLast7Days = await this.userService.getAverageActiveSessionsLast7Days()

    return {
      today,
      averageLast7Days
    }
  }

  @ApiOperation({ summary: 'user verification' })
  @ApiBody({ type: VerificationDto })
  @Post('verification')
  async verification (@Body() dto: VerificationDto): Promise<{ success: boolean }> {
    const user = await this.userService.verifyUser(dto.uid, dto.code)
    return { success: user.isVerified }
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user detail',
    type: CustomResponseWrapper(UserResponse)
  })
  @Post('')
  async createUser (@Body() { email, password }: CreateUserDto): Promise<Partial<User>> {
    return await this.userService.createUser(email, password)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users',
    type: CustomResponseWrapper(PaginatedResponse(UserResponse))
  })
  @Get()
  async getAllUsers (@Query() query: UserQueryDTO): Promise<{ list: Array<Partial<User>>, pagination: Pagination }> {
    return await this.userService.getAllUsers(query)
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user detail',
    type: CustomResponseWrapper(UserResponse)
  })
  @Get(':id')
  async getUserById (@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
    return await this.userService.getUserById(id)
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'The user detail',
    type: CustomResponseWrapper(UserResponse)
  })
  @Patch(':id')
  async updateUserPassword (@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<Partial<User>> {
    return await this.userService.updateUserPassword(id, dto)
  }
}
