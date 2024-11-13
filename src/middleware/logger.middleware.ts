import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const requestType = req.method;
    const details = { url: req.url, headers: req.headers };

    await this.logsService.logRequest(ip, requestType, details);
    next();
  }
}
