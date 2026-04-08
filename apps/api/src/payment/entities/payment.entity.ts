import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;
export type PaymentProvider = 'momo';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled';

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;
  @Prop({ type: String, enum: ['momo'], default: 'momo' })
  provider!: PaymentProvider;
  @Prop({ required: true })
  orderId!: string;
  @Prop({ required: true })
  requestId!: string;
  @Prop({ default: '' })
  transactionId!: string;
  @Prop({ required: true, min: 0 })
  amount!: number;
  @Prop({
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled'],
    default: 'pending',
  })
  status!: PaymentStatus;
  @Prop({ type: Object, default: {} })
  rawResponse!: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ orderId: 1 }, { unique: true });
PaymentSchema.index({ requestId: 1 }, { unique: true });
PaymentSchema.index({ userId: 1, createdAt: -1 });
PaymentSchema.index({ status: 1, createdAt: -1 });
