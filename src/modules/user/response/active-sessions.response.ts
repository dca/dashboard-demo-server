import { ApiProperty } from '@nestjs/swagger'

export class ActiveSessionsResponse {
  @ApiProperty({ example: 5 })
    today: number

  @ApiProperty({ example: 3 })
    averageLast7Days: number
}
