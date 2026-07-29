import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: [String], default: [] })
  stack!: string[];

  @Prop()
  repoUrl?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Concept', default: [] })
  relatedConcepts!: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
