import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GithubService } from './github.service';
import { GetIssuesDto } from './dto/get-issues.dto';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('issues')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getIssues(@Query() query: GetIssuesDto) {
    return this.githubService.getIssues(query.owner, query.repo, query.page);
  }
}
