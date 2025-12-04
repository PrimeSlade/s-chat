import { Controller, Get, Body, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseType } from 'src/common/types/responce.type';
import { User } from './entities/user.entity';
import { UpdateCategoriesDto, updateCategoriesSchema } from './dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@Req() req): ResponseType<User> {
    return { data: req.user, message: 'User fetched successfully' };
  }

  @Patch()
  async updateCategories(
    @Req() req,
    @Body(new ZodValidationPipe(updateCategoriesSchema))
    updateCategoriesDto: UpdateCategoriesDto,
  ): Promise<ResponseType<User>> {
    console.log(updateCategoriesDto);
    const result = await this.usersService.updateCategories(
      req.user.id,
      updateCategoriesDto,
    );

    return { data: result, message: 'Categories updated successfully' };
  }

  @Patch('me')
  async softDeleteUSer(@Req() req): Promise<ResponseType<null>> {
    await this.usersService.softDeleteUser(req.user.id);

    return { message: 'User deleted successfully' };
  }
}
