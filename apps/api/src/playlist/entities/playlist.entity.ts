import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true, collection: 'playlists' })
export class Playlist {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;
  @Prop({ default: '', maxlength: 300 })
  description!: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner!: Types.ObjectId;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Track' }], default: [] })
  tracks!: Types.ObjectId[];
  @Prop({ type: Boolean, default: false })
  isPublic!: boolean;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.index({ owner: 1, createdAt: -1 });
PlaylistSchema.index({ isPublic: 1, createdAt: -1 });
PlaylistSchema.index({ owner: 1, name: 1 });
