import { IsString, IsOptional, IsInt, Min } from 'class-validator';
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
}
