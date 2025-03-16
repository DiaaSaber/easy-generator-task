import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'New Name', description: "The user's new name" })
  @IsString()
  @MinLength(3)
  name: string;
}
