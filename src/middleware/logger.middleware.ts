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
      '/logs': 'get_logs',
    };

    const requestPath =
      Object.keys(routeMap).find((path) => req.originalUrl.startsWith(path)) ||
      req.originalUrl;
    const requestType = routeMap[requestPath] || requestPath;

    res.on('finish', async () => {
      const statusCode = res.statusCode;

      await this.logsService.logRequest(ip, requestType, {
        url: req.originalUrl,
        headers: { ...req.headers, 'status-code': statusCode },
      });
    });

    next();
  }
}
