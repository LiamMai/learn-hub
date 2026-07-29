import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Difficulty } from '../../concepts/entities/concept.entity';

export class CreateInterviewQuestionDto {
  @IsMongoId()
  conceptId!: string;

  @IsString()
  question!: string;

  @IsString()
  answer!: string;

  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  followUps?: string[];
}
