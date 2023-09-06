import { ApiProperty } from '@nestjs/swagger'

export function CustomResponseWrapper<T> (classRef: new () => T): any {
  class CustomResponse {
    @ApiProperty({ example: true })
      success: boolean

    @ApiProperty({ type: classRef })
      data: T
  }
  Object.defineProperty(CustomResponse, 'name', { value: `CustomResponseFor${classRef.name}` })

  return CustomResponse
}
