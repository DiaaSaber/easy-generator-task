import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Pass123!',
    description:
      'Password (min 8 chars, must contain letter, number, and special char)',
  })
  @IsString()
  @MinLength(8)
  @Matches(/[A-Za-z]/, { message: 'Must contain at least one letter' })
  @Matches(/[0-9]/, { message: 'Must contain at least one digit' })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Must contain at least one special character',
  })
  password: string;
}
