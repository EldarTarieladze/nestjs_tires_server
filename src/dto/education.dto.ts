import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EducationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;
}
