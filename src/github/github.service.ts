import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getIssues(owner: string, repo: string, page: number) {
    const apiBase = this.configService.get('GITHUB_API_URL');
    const apiUrl = `${apiBase}/repos/${owner}/${repo}/issues`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl, { params: { per_page: 30, page } }),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Resource not found');
      }

      throw new HttpException(error.message, error.response?.status || 500);
    }
  }
}
