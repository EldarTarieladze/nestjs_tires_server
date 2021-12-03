import { ApiProperty } from '@nestjs/swagger';

export class TireDto {
  @ApiProperty()
  tireType: string;

  @ApiProperty()
  tireWidth: string;

  @ApiProperty()
  aspectRatio: string;

  @ApiProperty()
  wheelDiameter: string;

  @ApiProperty()
  tireSize: string;

  @ApiProperty()
  mainPhoto: string;

  @ApiProperty()
  photos: string;
}
