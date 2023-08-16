import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsEmail()
  @IsNotEmpty()
    email: string

  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'The password of the user (min length: 8, at least one uppercase letter, one lowercase letter, one number, and one special character)'
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  @IsNotEmpty()
    password: string
}
