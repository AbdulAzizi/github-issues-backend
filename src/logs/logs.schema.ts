import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IncomingHttpHeaders } from 'http';

@Schema()
export class Log extends Document {
  @Prop() ip: string;
  @Prop() timestamp: Date;
  @Prop() requestType: string;
  @Prop({ type: MongooseSchema.Types.Mixed })
  details: { url: string; headers: IncomingHttpHeaders };
}

export const LogSchema = SchemaFactory.createForClass(Log);
