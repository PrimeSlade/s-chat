import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ResponseType } from 'src/common/types/responce.type';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import { updateUsernameSchema, UpdateUsernameDto } from './dto/user.dto';
import { User } from 'generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Session() session: UserSession) {
    return { data: session.user, message: 'User fetched successfully' };
  }

  @Get('friends')
  async getFriends() {}

  @Patch('me/username')
  async updateUsername(
    @Body(new ZodValidationPipe(updateUsernameSchema)) body: UpdateUsernameDto,
    @Session() session: UserSession,
  ): Promise<ResponseType<User>> {
    const user = await this.usersService.updateUsername(
      session.user.id,
      body.username,
    );

    return { data: user, message: 'Username updated successfully' };
  }

  // @Patch('me')
  // async softDeleteUSer(@Req() req): Promise<ResponseType<null>> {
  //   await this.usersService.softDeleteUser(req.user.id);

  //   return { message: 'User deleted successfully' };
  // }

  @Post('/request-by-username')
  async addFriend(
    @Body() body: { username: string },
    @Session() session: UserSession,
  ) {
    const user = await this.usersService.findUserByUserName(
      body.username,
      session.user.id,
    );

    const addedUser = this.usersService.addUser(user.id, session.user.id);

    return { data: addedUser, message: 'User added successfully' };
  }

  @Post('/accept')
  async acceptFriend(
    @Body() body: { id: string },
    @Session() session: UserSession,
  ) {
    const user = await this.usersService.acceptUser(body.id, session.user.id);

    return { data: user, message: 'User accepted successfully' };
  }
}
