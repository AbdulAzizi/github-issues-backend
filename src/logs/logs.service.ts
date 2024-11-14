import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './logs.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}

  async logRequest(ip: string, requestType: string, details: object) {
    const newLog = new this.logModel({
      ip,
      timestamp: new Date(),
      requestType,
      details,
    });
    await newLog.save();
  }

  async getLogs(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const logs = await this.logModel.find().skip(skip).limit(limit).exec();
    const totalLogs = await this.logModel.countDocuments();

    return {
      data: logs,
      total: totalLogs,
      page,
      limit,
      totalPages: Math.ceil(totalLogs / limit),
    };
  }
}
