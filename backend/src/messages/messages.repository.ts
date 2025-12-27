import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(
    data: { content: string; senderId: string; roomId: string },
    trx?: Prisma.TransactionClient,
  ) {
    const db = trx || this.prismaService;

    return db.message.create({
      data: {
        ...data,
      },
    });
  }
}
