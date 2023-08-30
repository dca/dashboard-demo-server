import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService) {
    //
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

  async getAllUsers (): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async incrementUserLoginCount (userId: number): Promise<void> {
    await this.updateById(userId, {
      loginCount: { increment: 1 },
      lastSession: new Date()
    })
  }
}
