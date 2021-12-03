import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegDto } from 'dto/registration.dto';
import { RegistrationService } from './registration.service';

interface TUserReg {
  message: string;
}
@Controller('registration')
@ApiTags('Registration')
export class RegistrationController {
  constructor(private readonly registraitonService: RegistrationService) {}
  @Post()
  @ApiBody({ type: RegDto })
  async registrationUser(@Body() user: RegDto): Promise<TUserReg> {
    return await this.registraitonService.registartionUser(user);
  }
}
