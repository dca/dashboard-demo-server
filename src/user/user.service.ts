import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/db/repository/user.repository';
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
}
