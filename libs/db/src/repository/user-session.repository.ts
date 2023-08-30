import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { getCurrentDate } from '@src/utils/get-current-day'

@Injectable()
export class UserSessionRepository {
  constructor (private readonly prisma: PrismaService) { }

  async upsertUserSession (userId: number): Promise<void> {
    const currentDatetime = new Date()
    const currentDate = getCurrentDate()

    await this.prisma.userSession.upsert({
      where: { userId_sessionDate: { userId, sessionDate: currentDate } },
      update: { lastSeen: currentDatetime, sessionDate: currentDate },
      create: { userId, lastSeen: currentDatetime, sessionDate: currentDate }
    })
  }

  async getActiveSessionsToday (): Promise<number> {
    const today = getCurrentDate()

    const activeUsersTodayCount = await this.prisma.userSession.count({
      where: { sessionDate: today }
    })

    return activeUsersTodayCount // This gives the count of active users for today
  }

  async getAverageActiveSessionsLast7Days (): Promise<number> {
    const sevenDaysAgo = getCurrentDate(-7)

    const activeUsersLast7DaysCount = await this.prisma.userSession.count({
      where: { sessionDate: { gte: sevenDaysAgo } }
    })

    const average = activeUsersLast7DaysCount / 7

    return average // This gives the average of active users for the last 7 days
  }
}
