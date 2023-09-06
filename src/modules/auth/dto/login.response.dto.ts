import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsInt } from 'class-validator'

export interface LoginResponseDtoInterface {
  email: string
  sub: string
  access_token: string
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsNotEmpty()
  @IsString()
    email: string

  @ApiProperty({
    example: 3,
    description: 'sub'
  })
  @IsNotEmpty()
  @IsInt()
    sub: string

  @ApiProperty({
    example: 'eyJh00ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOjMsImlhdCI6MTY5Mzk3Mzk5000.zwG7S5D-Yp7u57vV00nHdVC9pksMpDYUIKVdwaX5M9y',
    description: 'The jwt token the user'
  })
  @IsNotEmpty()
  @IsString()
    access_token: string
}
