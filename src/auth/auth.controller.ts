import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { User } from './entities/user.entity';
import { GetUser, GetRawHeaders } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  testPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRawHeaders() rawHeaders: string[],
  ) {
    return { messasges: 'ok', user, email, rawHeaders };
  }

  @Get('test')
  @UseGuards(AuthGuard())
  test2(@GetUser() user: User) {
    return { messasges: 'ok', user };
  }
}
