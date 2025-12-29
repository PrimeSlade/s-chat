import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, createMessageSchema } from '../shared';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body(new ZodValidationPipe(createMessageSchema)) body: CreateMessageDto,
    @Session() session: UserSession,
  ) {
    console.log(body);
    const message = await this.messagesService.createMessage({
      senderId: session.user.id,
      ...body,
    });

    return { data: message, message: 'Message created sucessfully' };
  }
}
