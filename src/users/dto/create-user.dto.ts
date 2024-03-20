import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 2
  })
  password: string;
}
