import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  CreateMessageDto,
  createMessageSchema,
  GetMessagesDto,
  getMessagesSchema,
  Message,
} from '../shared';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import { RoomGuard } from './guards/room.guard';
import { ControllerResponse } from 'src/common/types/responce.type';

@UseGuards(RoomGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getMessages(
    @Query(new ZodValidationPipe(getMessagesSchema)) query: GetMessagesDto,
  ): Promise<ControllerResponse<Message[]>> {
    const { messages, hasNextPage, nextCursor } =
      await this.messagesService.getMessages(query);
    return {
      data: messages,
      message: 'Messages fetched sucessfully',
      pagination: {
        hasNextPage,
        nextCursor,
      },
    };
  }

  @Post()
  async createMessage(
    @Body(new ZodValidationPipe(createMessageSchema)) body: CreateMessageDto,
    @Session() session: UserSession,
  ): Promise<ControllerResponse<Message>> {
    const message = await this.messagesService.createMessage({
      senderId: session.user.id,
      ...body,
    });

    return { data: message, message: 'Message created sucessfully' };
  }
}
