import { Traceable } from '@amplication/opentelemetry-nestjs';
import { PrismaService } from '@app/db/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Traceable()
@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService ) {}
  async getHello(name = ''): Promise<string> {
    console.log('Hi');
    const users = await this.prismaService.user.findMany({

    });

    const users2 = await this.prismaService.user.create({
      data: {
        email: `r${Math.random()}@gmail.com`,
        password: '123456',
      }
    });
    return 'Hello World! ' + name + ' ' + Date.now()
  }
}
