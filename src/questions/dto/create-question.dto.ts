import {
  IsString,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsArray,
  ValidateIf,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChoiceDto } from './create-choice.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  subtopicId: string;

  @IsEnum(['MCQ', 'TF', 'FILL'])
  @IsNotEmpty()
  type: 'MCQ' | 'TF' | 'FILL';

  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  // Only validate choices if type is 'MCQ'
  @ValidateIf((o) => o.type === 'MCQ')
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChoiceDto)
  choices?: CreateChoiceDto[];

  // Ensure choices is NOT provided if type is not MCQ
  @ValidateIf((o) => o.type !== 'MCQ')
  @IsOptional()
  @IsNotEmpty({
    each: true,
    message: 'Choices must not be provided unless type is MCQ',
  })
  choicesInvalidCheck?: never; // this will never pass if someone adds choices for non-MCQ
}
