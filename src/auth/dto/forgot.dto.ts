import { IsEmail, IsStrongPassword } from 'class-validator';

export class ForgotDto {
  @IsEmail()
  email: string;
}
