import { IsArray, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { TopicCategory } from '../entities/topic.entity';

export class CreateTopicDto {
  @IsString()
  title!: string;

  @IsEnum(TopicCategory)
  category!: TopicCategory;

  @IsUrl()
  sourceDocUrl!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
