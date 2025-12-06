import { Injectable } from '@nestjs/common';
import { Friendship, User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findFriends(myId: string): Promise<Friendship[]> {
    const friends = await this.prismaService.friendship.findMany({
      where: {
        id: myId,
        status: 'ACCEPTED',
      },
    });

    return friends;
  }

  async findPendingStrangers(myId: string): Promise<Friendship[]> {
    const strangers = await this.prismaService.friendship.findMany({
      where: {
        id: myId,
        status: 'PENDING',
      },
    });

    return strangers;
  }

  async findUserByUserName(username: string, myId: string): Promise<User> {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        username,
        id: { not: myId },
      },
    });
    return user;
  }

  //add user via ids
  async addUser(receiverId: string, senderId: string): Promise<Friendship> {
    const user = await this.prismaService.friendship.create({
      data: {
        senderId,
        receiverId,
      },
    });

    return user;
  }

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

  async acceptUser(receiverId: string, senderId: string): Promise<Friendship> {
    const user = await this.prismaService.friendship.update({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
      data: {
        status: 'ACCEPTED',
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
