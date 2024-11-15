import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;

    const routeMap: Record<string, string> = {
      '/github/issues': 'get_issues',
      '/github/issue': 'get_issue',
    };

    const requestPath =
      Object.keys(routeMap).find((path) => req.originalUrl.startsWith(path)) ||
      req.originalUrl;
    const requestType = routeMap[requestPath] || requestPath;

    const details = { url: req.url, headers: req.headers };

    await this.logsService.logRequest(ip, requestType, details);
    next();
  }
}
