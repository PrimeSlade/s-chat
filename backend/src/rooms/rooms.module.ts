import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsReposiory } from './rooms.repository';
import { MessagesModule } from 'src/messages/messages.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [MessagesModule, CommonModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsReposiory],
  exports: [RoomsReposiory],
})
export class RoomsModule {}
