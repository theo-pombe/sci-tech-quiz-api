import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { SubjectLevel } from '../entities/subject.entity';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  code: string;

  @IsEnum(SubjectLevel, {
    message: 'Level must be either o-level or a-level',
  })
  level: SubjectLevel;
}
