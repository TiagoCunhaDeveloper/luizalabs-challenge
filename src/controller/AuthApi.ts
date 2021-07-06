import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/LoginDTO';
import { AuthService } from '../services/AuthService';

@Controller('auth')
export class AuthApi {

  constructor(
    private readonly authService: AuthService
  ) {}


  @Post()
  login(@Body() payload: LoginDTO): Promise<string> {
    return this.authService.login(payload)
  }

}
