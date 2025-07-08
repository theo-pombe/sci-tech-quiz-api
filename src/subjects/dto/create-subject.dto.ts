import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { EducationLevel } from 'src/users/entities/profile.entity';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  code: string;

  @IsEnum(EducationLevel, {
    message: 'Level must be either o-level or a-level',
  })
  level: EducationLevel;
}
