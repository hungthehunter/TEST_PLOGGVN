import { Controller, Post, Get, Body, Inject, Headers, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../services/users.services.interface';
import * as usersDto from '../models/users.dto';
@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService) 
    private readonly userService: IUserService
  ) {}

  @Post('sign-up') 
  async signUp(@Body() body: usersDto.SignUpDto) {
    console.log('Received sign-up request with body:', body);
    const user = await this.userService.signUp(body);

    return {
      status: 'OK',
      message: 'User registered successfully',
      data: user
    };
  }

  @Post('sign-in')
  async signIn(@Body() body: any) {
    const result = await this.userService.signIn(body);
    return {
      status: 'OK',
      data: result
    }
  }

  @Get()
  async getAllUsers() {
      return this.userService.findAll();
  }

  @Post('refresh-token')
  async refreshToken(@Headers('token') tokenHeader: string) {
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token is missing or malformed');
    }

    const refreshToken = tokenHeader.split(' ')[1];
    
    return this.userService.refreshToken(refreshToken);
  }
}