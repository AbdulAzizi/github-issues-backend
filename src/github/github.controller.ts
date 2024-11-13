import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('issues')
  async getIssues(
    @Query('owner') owner: string,
    @Query('repo') repo: string,
    @Query('page') page: number = 1,
  ) {
    return this.githubService.getIssues(owner, repo, page);
  }
}
