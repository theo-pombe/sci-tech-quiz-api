import { IsEnum, IsNotEmpty } from 'class-validator';
import { EducationLevel, UserRole } from 'src/users/entities/profile.entity';

export class InitializeProfile {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsEnum(EducationLevel)
  levelOfEducation: EducationLevel;
}
