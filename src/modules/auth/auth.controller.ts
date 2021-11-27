import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IAuthToken } from '@app/types';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() bodyData: LoginAuthDto): Promise<IAuthToken> {
    return await this.authService.login(bodyData);
  }
}
