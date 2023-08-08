import { Injectable } from '@nestjs/common';
import { UserRepository } from 'libs/db/src/repository/user.repository';
import * as argon2 from 'argon2';
import { PrismaService } from '@app/db/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserRepository
  ) { }

  async createUser(email: string, password: string) {
    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

    return this.userRepository.create({
      email: email,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (user && await argon2.verify('user.password', password)) {
      return user;
    }
    return null;
  }
}