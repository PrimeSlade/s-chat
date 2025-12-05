import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  // async findOne(id: number): Promise<User> {
  //   const user = await this.prismaService.user.findUniqueOrThrow({
  //     where: {
  //       id,
  //       deletedAt: null,
  //     },
  //   });
  //   const { password, ...result } = user;
  //   return result;
  // }

  async updateUsername(userId: string, username: string): Promise<User> {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return user;
  }
  // async softDeleteUser(id: number): Promise<undefined> {
  //   await this.prismaService.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       deletedAt: new Date(),
  //     },
  //   });
  // }
}
