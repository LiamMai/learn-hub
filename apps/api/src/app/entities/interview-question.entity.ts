import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Difficulty } from './concept.entity';

export type InterviewQuestionDocument = HydratedDocument<InterviewQuestion>;

@Schema({ timestamps: true })
export class InterviewQuestion {
  @Prop({ type: Types.ObjectId, ref: 'Concept', required: true })
  conceptId!: Types.ObjectId;

  @Prop({ required: true })
  question!: string;

  @Prop({ required: true })
  answer!: string;

  @Prop({
    required: true,
    type: String,
    enum: Difficulty,
    default: Difficulty.BEGINNER,
  })
  difficulty!: Difficulty;

  @Prop({ type: [String], default: [] })
  followUps!: string[];
}

export const InterviewQuestionSchema =
  SchemaFactory.createForClass(InterviewQuestion);
