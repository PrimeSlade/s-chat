import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseType } from 'src/common/types/responce.type';
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { UpdateCategoriesDto, updateCategoriesSchema } from './dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findOne(
    @UserDecorator() user: { userId: number },
  ): Promise<ResponseType<User>> {
    const result = await this.usersService.findOne(user.userId);

    return { data: result, message: 'User fetched successfully' };
  }

  @Patch()
  async updateCategories(
    @UserDecorator() user: { userId: number },
    @Body(new ZodValidationPipe(updateCategoriesSchema))
    updateCategoriesDto: UpdateCategoriesDto,
  ): Promise<ResponseType<User>> {
    console.log(updateCategoriesDto);
    const result = await this.usersService.updateCategories(
      user.userId,
      updateCategoriesDto,
    );

    return { data: result, message: 'Categories updated successfully' };
  }

  @Patch('me')
  async softDeleteUSer(
    @UserDecorator() user: { userId: number },
  ): Promise<ResponseType<null>> {
    await this.usersService.softDeleteUser(user.userId);

    return { message: 'User deleted successfully' };
  }
}
