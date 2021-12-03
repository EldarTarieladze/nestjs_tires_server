import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { authRole } from 'decorators/roles.decorator';
import { EducationDto } from 'dto/education.dto';
import { Roles } from 'guards/role.enum';
import { RolesGuard } from 'guards/role.guard';
import { IUserEducation } from 'models/education.model';
import { EducationService } from './education.service';

class InotFoundError {
  objectOrError?: any;
  description: string;
}

@Controller('education')
@ApiTags('Education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiBearerAuth('access-token')
  @Get('/:educationID')
  async getEducationInfo(
    @Param('educationID', ParseUUIDPipe) educationID: string,
  ): Promise<IUserEducation | InotFoundError> {
    return await this.educationService.getEducationInfo(educationID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async findEducations(@Req() req): Promise<any> {
    return await this.educationService.findEducations(req.user.userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async addEducationInfo(
    @Req() req,
    @Body() education: EducationDto,
  ): Promise<string> {
    return await this.educationService.addEducationInfo(
      req.user.userID,
      education,
    );
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('/:educationID')
  async updateEducationInfo(
    @Param('educationID') educationID: string,
    @Body() education: EducationDto,
  ): Promise<IUserEducation | string> {
    return await this.educationService.updateEducationInfo(
      educationID,
      education,
    );
  }

  @ApiBearerAuth('access-token')
  @Delete('/:educationID')
  async deleteEducationInfo(
    @Param('educationID') educataionID: string,
  ): Promise<string> {
    console.log(educataionID, 'controller');
    return await this.educationService.deleteEducationInfo(educataionID);
  }
}
