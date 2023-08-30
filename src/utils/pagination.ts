import { ApiProperty } from '@nestjs/swagger'

export interface PaginationParams {
  page: number
  limit: number
}

export class Pagination {
  @ApiProperty({ description: 'The current page', example: 1 })
    current_page: number

  @ApiProperty({ description: 'The total pages', example: 5 })
    total_pages: number

  @ApiProperty({ description: 'The items per page', example: 10 })
    per_page: number

  @ApiProperty({ description: 'The total count', example: 49 })
    total_count: number
}

export function PaginatedResponse<T> (TClass: new (...args: any[]) => T): any {
  class PaginatedResponse {
    @ApiProperty({ type: [TClass] })
      list: T[]

    @ApiProperty({ type: Pagination })
      pagination: Pagination
  }

  return PaginatedResponse
}

export function generatePagination (
  { page, limit }: PaginationParams,
  totalCount: number
): Pagination {
  const totalPages = Math.ceil(totalCount / limit)

  return {
    current_page: page,
    total_pages: totalPages,
    per_page: limit,
    total_count: totalCount
  }
}
