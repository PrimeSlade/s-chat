import { BadRequestException, Injectable } from '@nestjs/common';
import { RoomsReposiory } from './rooms.repository';
import {
  RoomParticipantWithRoom,
  RoomParticipantWithRoomByUserId,
  Room,
  CreateDirectRoomDto,
  RoomParticipantWithRoomByRoomId,
} from 'src/shared';
import { MessagesRepository } from 'src/messages/messages.repository';
import { PrismaService } from 'src/prisma.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class RoomsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roomsRepository: RoomsReposiory,
    private readonly messagesRepositroy: MessagesRepository,
    private readonly chatGateway: ChatGateway,
  ) {}

  async createDirectRoom(
    data: CreateDirectRoomDto,
    myId: string,
  ): Promise<Room | RoomParticipantWithRoomByUserId> {
    const existingRoom = await this.roomsRepository.findRoomByUserId(
      myId,
      data.otherId,
    );

    if (existingRoom) {
      const message = await this.messagesRepositroy.createMessage({
        content: data.content,
        senderId: myId,
        roomId: existingRoom.roomId,
      });

      //web socket
      this.chatGateway.server
        .to(existingRoom.roomId)
        .emit('new_message', { data: message });

      return existingRoom;
    }

    if (myId === data.otherId) {
      throw new BadRequestException('Cannot create room with yourself');
    }

    return this.prismaService.$transaction(async (trx) => {
      const room = await this.roomsRepository.createDirectRoom(
        {
          myId,
          otherId: data.otherId,
        },
        trx,
      );

      const message = await this.messagesRepositroy.createMessage(
        {
          content: data.content,
          senderId: myId,
          roomId: room.id,
        },
        trx,
      );

      //web socket
      console.log(`📤 Emitting new_message to room: ${room.id}`, message);
      this.chatGateway.server
        .to(room.id)
        .emit('new_message', { data: message });

      return room;
    });
  }

  async getRooms(myId: string): Promise<RoomParticipantWithRoom[]> {
    return this.roomsRepository.findRooms(myId);
  }

  async getMyRoomByRoomId(
    myId: string,
    roomId: string,
  ): Promise<RoomParticipantWithRoomByRoomId> {
    return this.roomsRepository.findMyRoombyRoomId(myId, roomId);
  }

  async getRoomByUserId(
    myId: string,
    userId: string,
  ): Promise<RoomParticipantWithRoomByUserId | null> {
    return this.roomsRepository.findRoomByUserId(myId, userId);
  }
}
