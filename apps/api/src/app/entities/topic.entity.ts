import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopicDocument = HydratedDocument<Topic>;

export enum TopicCategory {
  ANGULAR = 'angular',
  NESTJS = 'nestjs',
  MONGODB = 'mongodb',
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
}

@Schema({ timestamps: true })
export class Topic {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, type: String, enum: TopicCategory })
  category!: TopicCategory;

  @Prop({ required: true })
  sourceDocUrl!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
