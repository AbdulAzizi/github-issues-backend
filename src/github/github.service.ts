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

  private parseLinkHeader(linkHeader: string) {
    if (!linkHeader) {
      return { hasNextPage: false, hasPrevPage: false };
    }

    const links = linkHeader.split(',').reduce(
      (acc, part) => {
        const match = part.match(/<(.*?)>; rel="(.*?)"/);
        if (match) {
          const [, url, rel] = match;
          acc[rel] = url;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      hasNextPage: !!links.next,
      hasPrevPage: !!links.prev,
    };
  }

  async getIssues(owner: string, repo: string, page: number, limit: number) {
    const apiBase = this.configService.get('GITHUB_API_URL');
    const apiUrl = `${apiBase}/repos/${owner}/${repo}/issues`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${this.configService.get('GITHUB_TOKEN')}`,
          },
          params: { per_page: limit, page },
        }),
      );
      const linkHeader = response.headers['link'];
      const paginationInfo = this.parseLinkHeader(linkHeader);

      return {
        data: response.data,
        page: page,
        perPage: limit,
        hasNextPage: paginationInfo.hasNextPage,
        hasPrevPage: paginationInfo.hasPrevPage,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Resource not found');
      }

      throw new HttpException(error.message, error.response?.status || 500);
    }
  }
}
