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

  async findOne (email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findUnique (args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return await this.prisma.user.findUnique(args)
  }

  async getAllUsers (): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async getActiveSessionsToday (): Promise<number> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return await this.prisma.user.count({
      where: {
        lastSession: {
          gte: today
        }
      }
    })
  }

  async getAverageActiveSessionsLast7Days (): Promise<number> {
    const now = new Date()
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))

    const activeSessions = await this.prisma.user.count({
      where: {
        lastSession: {
          gte: sevenDaysAgo
        }
      }
    })

    return activeSessions / 7
  }

  //
}
