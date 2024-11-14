import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLogsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The "limit" parameter must be an integer.' })
  @Min(10, { message: 'The "limit" parameter must be at least 10.' })
  @Max(250, { message: 'The "limit" parameter must be maximum 250.' })
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The "page" parameter must be an integer.' })
  @Min(1, { message: 'The "page" parameter must be at least 1.' })
  page?: number = 1;
}
