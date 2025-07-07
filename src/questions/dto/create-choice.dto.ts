import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateChoiceDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
