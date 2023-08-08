import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

const allRepositorys = [
  UserRepository,
]

@Module({
  providers: [
    DbService,
    PrismaService,
    ...allRepositorys,
  ],
  exports: [
    DbService,
    PrismaService,
    ...allRepositorys,
  ],
})
export class DbModule {}
