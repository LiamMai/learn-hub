import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConceptDocument = HydratedDocument<Concept>;

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Schema({ timestamps: true })
export class Concept {
  @Prop({ type: Types.ObjectId, ref: 'Topic', required: true })
  topicId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  shortExplain!: string;

  @Prop()
  originalQuote?: string;

  @Prop()
  codeExample?: string;

  @Prop({
    required: true,
    type: String,
    enum: Difficulty,
    default: Difficulty.BEGINNER,
  })
  difficulty!: Difficulty;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
