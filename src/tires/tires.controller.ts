import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TireDto } from 'dto/tire.dto';
import { ITire } from 'models/tires.model';
import { TiresService } from './tires.service';

@Controller('my-tires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addTire(@Req() req, @Body() tire: TireDto): Promise<string> {
    return await this.tiresService.addTire(req.user.userID, tire);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/:tireID')
  async getAllTire(
    @Param('tireID') tireID: string,
    @Req() req,
  ): Promise<ITire> {
    return await this.tiresService.getTire(req.user.userID, tireID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getTire(@Req() req): Promise<ITire[] | string> {
    return await this.tiresService.getTires(req.user.userID);
  }
}
