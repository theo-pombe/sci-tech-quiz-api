import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InitializeProfile } from './initilize-profile.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber('TZ') // You can replace 'TZ' with 'ZZ' for any region
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => InitializeProfile)
  profile: InitializeProfile;
}
