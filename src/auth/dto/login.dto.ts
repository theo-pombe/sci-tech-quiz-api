import { IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('TZ') // Replace with 'ZZ' if you want generic
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
