import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import { createUserSchema } from 'src/users/dto/user.dto';
import type { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { RegisterDto, SignInDto, signInSchema } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { ResponseType } from 'src/common/types/responce.type';
import { GoogleOAuthGard } from './google-oauth.guard';
import { RefreshTokenGuard } from './refresh-token.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseType<User>> {
    const user = await this.authService.register(registerDto);

    return {
      data: user,
      message: 'User created successfully',
    };
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ access_token: string; message: string }> {
    const token = await this.authService.signIn(signInDto);

    response.cookie('s_chat_refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });

    return {
      access_token: token.access_token,
      message: 'Successfully logged in',
    };
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.getTokens(req.user.id);

    response.cookie('s_chat_refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });

    return {
      access_token: token.access_token,
      message: 'Successfully refreshed',
    };
  }

  @Get('google')
  @UseGuards(GoogleOAuthGard)
  async googleOAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGard)
  googleAuthRedirect(@Req() req) {
    return {
      message: 'User information from Google',
      data: req.user,
    };
  }
}
