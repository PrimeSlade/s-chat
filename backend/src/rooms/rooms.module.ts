import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsReposiory } from './rooms.repository';
import { MessagesModule } from 'src/messages/messages.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [MessagesModule, ChatModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsReposiory],
})
export class RoomsModule {}
