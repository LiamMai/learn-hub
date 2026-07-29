import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.entity';

export type KeyTokenDocument = HydratedDocument<KeyToken>;

@Schema({ timestamps: true })
export class KeyToken {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId;

  @Prop({ required: true })
  publicKey!: string;

  @Prop({ required: true })
  privateKey!: string;

  @Prop({ type: [String], default: [] })
  refreshTokenUsed!: string[];

  @Prop({ required: true })
  refreshToken!: string;
}

export const KeyTokenSchema = SchemaFactory.createForClass(KeyToken);
