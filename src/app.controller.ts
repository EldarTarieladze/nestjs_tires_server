import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TAuth } from 'interface/response.interface';
import { AppService } from './app.service';

@Controller()
@ApiTags('healthyCheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refreshToken(@Request() req): Promise<TAuth> {
    return this.appService.generateNewToken(req.user);
  }
}
