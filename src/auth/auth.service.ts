import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { hashPassword } from 'src/common/helpers/hahs.helper';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(user.password);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  // async singIn(user: CreateUserDto): Promise<User> {
  //   const user;
  // }
}
