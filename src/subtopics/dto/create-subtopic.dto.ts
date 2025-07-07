import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateSubtopicDto {
  @IsNotEmpty()
  @IsNumber()
  topicId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
