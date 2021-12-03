import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'guards/role.enum';
import { RolesGuard } from 'guards/role.guard';
import { authRole } from 'decorators/roles.decorator';
import { ProtectedService } from './protected.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TTokenPayload } from 'interface/tokenPayload.class';

@Controller('info')
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class ProtectedController {
  constructor(private readonly protectedService: ProtectedService) {}
  @authRole(Roles.Admin, Roles.Editor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  getStudentInfo(): string {
    return this.protectedService.getStudentInfo();
  }

  @authRole(Roles.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('editor')
  getStudent(): string {
    return 'Hello Editor';
  }
  // @authRole(Roles.Editor, Roles.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('user')
  getPayload(@Req() req, @Body() data: any): TTokenPayload {
    console.log(req.user, data);
    return req.user;
  }
}
