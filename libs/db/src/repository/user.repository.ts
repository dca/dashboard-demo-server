import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
