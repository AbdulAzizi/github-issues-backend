import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { GetLogsDto } from './dto/get-logs.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getLogs(@Query() query: GetLogsDto) {
    return this.logsService.getLogs(query.page, query.limit);
  }
}
