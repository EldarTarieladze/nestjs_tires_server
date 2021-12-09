import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class TireDto {
  @ApiProperty()
  @IsNotEmpty()
  tireType: string;

  @ApiProperty()
  @IsNotEmpty()
  tireWidth: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  @ApiProperty()
  aspectRatio: string;

  @IsNotEmpty()
  @ApiProperty()
  wheelDiameter: string;

  @IsNotEmpty()
  @ApiProperty()
  tireSize: string;

  // @IsNotEmpty()
  // @ApiProperty()
  // mainPhoto: string;

  // @ApiProperty()
  // @IsArray()
  // photos: [];
}
