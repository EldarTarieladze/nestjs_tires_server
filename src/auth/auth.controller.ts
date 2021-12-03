import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'dto/auth.dto';
import { AuthService } from './auth.service';

interface TAuth {
  success: boolean;
  access_token: string;
}
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @ApiBody({ type: AuthDto })
  authStudent(@Body() dto: AuthDto): Promise<TAuth> {
    return this.authService.signinLocal(dto);
  }
}
