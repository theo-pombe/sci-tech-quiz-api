import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  IsEnum,
} from 'class-validator';
import { EducationLevel } from 'src/users/entities/profile.entity';

export class RegisterDto {
  @IsNotEmpty()
  @IsPhoneNumber('TZ')
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(EducationLevel)
  levelOfEducation: EducationLevel;
}
