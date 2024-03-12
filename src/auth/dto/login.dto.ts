import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
