import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    default: 'tarieladze99@yahoo.com',
  })
  email: string;

  @ApiProperty({
    default: '1234',
  })
  password: string;
}
