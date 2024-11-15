import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetIssuesDto {
  @IsString({ message: 'The "owner" parameter must be a string.' })
  owner: string;

  @IsString({ message: 'The "repo" parameter must be a string.' })
  repo: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The "page" parameter must be an integer.' })
  @Min(1, { message: 'The "page" parameter must be at least 1.' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The "limit" parameter must be an integer.' })
  @Min(10, { message: 'The "limit" parameter must be at least 10.' })
  @Max(250, { message: 'The "limit" parameter must be maximum 250.' })
  limit?: number = 10;
}
