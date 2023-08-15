import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNotEmpty
} from 'class-validator'

export class CreateUserDto {
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

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'The confirmation of password'
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
    confirmPassword: string
}
