import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationParams } from '@src/utils/pagination'
import { ApiProperty } from '@nestjs/swagger'

export class UserResponse {
  @ApiProperty({ description: 'The user ID', example: 1 })
    id: number

  @ApiProperty({ description: 'The user email', example: 'user@example.com' })
    email: string

  @ApiProperty({ description: 'The user is verified' })
    isVerified: boolean

  @ApiProperty({ description: 'The user login count' })
    loginCount: number

  @ApiProperty({ description: 'The user last session timestamp', example: null })
    lastSession: number | null

  @ApiProperty({ description: 'The user created at timestamp', example: 1627776000000 })
    createdAt: number

  @ApiProperty({ description: 'The user updated at timestamp', example: 1627776000000 })
    updatedAt: number
}

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService) {
    //
  }

  private readonly defaultSelect = {
    id: true,
    email: true,
    isVerified: true,
    loginCount: true,
    lastSession: true,
    createdAt: true,
    updatedAt: true
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data })
  }

  async updateById (id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data
    })
  }

  async findOne (email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findUnique (args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return await this.prisma.user.findUnique(args)
  }

  async getUsers (query: PaginationParams): Promise<Array<Partial<User>>> {
    const { page, limit } = query
    const skip = (page - 1) * limit

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      select: this.defaultSelect
    })

    return users
  }

  async count (): Promise<number> {
    return await this.prisma.user.count()
  }

  async incrementUserLoginCount (userId: number): Promise<void> {
    await this.updateById(userId, {
      loginCount: { increment: 1 },
      lastSession: new Date()
    })
  }
}
