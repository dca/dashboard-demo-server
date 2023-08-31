import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsNumber
} from 'class-validator'

export class VerificationDto {
  @ApiProperty({
    example: 1383,
    description: 'the uid of the user'
  })
  @IsNumber()
  @IsNotEmpty()
    uid: number

  @ApiProperty({
    example: 'c0b6c3f0-4e76-472e-9160-293e85878a64',
    description: 'the verification code of the user'
  })
  @IsString()
  @IsNotEmpty()
    code: string
}
