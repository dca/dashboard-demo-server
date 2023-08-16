import { Injectable } from '@nestjs/common'
import { UserSession } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserSessionRepository {
  constructor (private readonly prisma: PrismaService) {}

  async createSession (userId: number): Promise<UserSession> {
    const now = new Date()
    const sessionDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

    return await this.prisma.userSession.create({
      data: {
        userId,
        lastSeen: now,
        sessionDate
      }
    })
  }

  async getActiveSessionsToday (): Promise<number> {
    const today = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()))

    const activeUsersTodayCount = await this.prisma.userSession.count({
      where: {
        sessionDate: today
      }
    })

    return activeUsersTodayCount // This gives the count of active users for today
  }

  async getAverageActiveSessionsLast7Days (): Promise<number> {
    const now = new Date()
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    const sevenDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 7))

    const activeUsersLast7DaysCount = await this.prisma.userSession.count({
      where: {
        sessionDate: {
          gte: sevenDaysAgo,
          lt: today
        }
      }
    })

    const average = activeUsersLast7DaysCount / 7

    return average
  }
}
