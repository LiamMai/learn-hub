import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  stack!: string[];

  @IsUrl()
  @IsOptional()
  repoUrl?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  relatedConcepts?: string[];
}
