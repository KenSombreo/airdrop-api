import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ example: 'email', description: 'Registered email address' })
  email: string;

  @ApiProperty({ example: 'password', description: 'Your password' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: true, description: 'Indicates if authentication was successful' })
  success: boolean;

  @ApiProperty({
    example: {
      token: 'eyJraWQiOiJ1TTZwSzJ6aXByUGx0WGJGKzQrVTd0a25w…',
    },
    description: 'JWT token issued upon successful authentication',
  })
  data: { token: string };
}
