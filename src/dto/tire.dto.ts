import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class TireDto {
  @ApiProperty()
  tireType: string;

  @ApiProperty()
  tireWidth: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  aspectRatio: string;

  @ApiProperty()
  wheelDiameter: string;

  @ApiProperty()
  tireSize: string;

  @ApiProperty()
  mainPhoto: string;

  @ApiProperty()
  @IsArray()
  photos: [];
}
