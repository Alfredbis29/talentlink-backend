import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Pagination query parameters DTO
 * Used for paginating list endpoints
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  /**
   * Calculate the offset for database queries
   * @returns offset value for SKIP
   */
  getOffset(): number {
    return (this.page - 1) * this.limit;
  }

  /**
   * Get the limit for database queries
   * @returns limit value
   */
  getLimit(): number {
    return this.limit;
  }
}

/**
 * Generic pagination response wrapper
 */
export class PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
