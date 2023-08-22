
import { ApiProperty } from '@nestjs/swagger'
import { IsEqualTo, IsNotEqualTo } from '@src/validators/equal-to'
import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty
} from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'The confirmation of password'
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
    currentPassword: string

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
  @IsNotEqualTo('currentPassword', {
    message: 'The new password and current password must be different'
  })
    newPassword: string

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'The confirmation of password'
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsEqualTo('newPassword', {
    message: 'The new password and confirm password do not match'
  })
    confirmPassword: string
}
