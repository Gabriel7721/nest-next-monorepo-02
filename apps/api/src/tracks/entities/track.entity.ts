import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;
@Schema({ timestamps: true, collection: 'tracks' })
export class Track {
  @Prop({ required: true, trim: true, maxlength: 120 })
  title!: string;
  @Prop({ required: true, trim: true, maxlength: 120 })
  artist!: string;
  @Prop({ default: '' })
  album!: string;
  @Prop({ default: '' })
  genre!: string;
  @Prop({ required: true })
  coverImageUrl!: string;
  @Prop({ required: true })
  audioUrl!: string;
  @Prop({ default: 0, min: 0 })
  duration!: number;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy!: Types.ObjectId;
  @Prop({ type: Boolean, default: true })
  isPublic!: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
TrackSchema.index({ title: 1 });
TrackSchema.index({ artist: 1 });
TrackSchema.index({ genre: 1 });
TrackSchema.index({ isPublic: 1, createdAt: -1 });
TrackSchema.index({ uploadedBy: 1, createdAt: -1 });
