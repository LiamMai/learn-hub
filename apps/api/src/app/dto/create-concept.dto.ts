import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Difficulty } from '../entities/concept.entity';

export class CreateConceptDto {
  @IsMongoId()
  topicId!: string;

  @IsString()
  title!: string;

  @IsString()
  shortExplain!: string;

  @IsString()
  @IsOptional()
  originalQuote?: string;

  @IsString()
  @IsOptional()
  codeExample?: string;

  @IsEnum(Difficulty)
  difficulty!: Difficulty;
}
