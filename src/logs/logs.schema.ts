import { Schema } from 'mongoose';

export const LogSchema = new Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
  type: String,
  details: Object,
});
