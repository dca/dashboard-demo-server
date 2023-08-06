import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [DbService, PrismaService],
  exports: [DbService],
})
export class DbModule {}
