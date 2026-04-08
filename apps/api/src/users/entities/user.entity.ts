import type { SubscriptionPlan, UserRole } from '@musical/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @Prop({ required: true, minlength: 6 })
  passwordHash!: string;

  @Prop({ required: true, trim: true, maxlength: 50 })
  displayName!: string;

  @Prop({ default: '' })
  avatarUrl!: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role!: UserRole;

  @Prop({ type: String, enum: ['free', 'vip'], default: 'free' })
  subscriptionPlan!: SubscriptionPlan;

  @Prop({ default: null, type: Date })
  vipExpiredAt!: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ role: 1 });
UserSchema.index({ subscriptionPlan: 1 });
