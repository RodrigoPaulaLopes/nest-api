import { IsEmail, IsJWT, IsStrongPassword } from 'class-validator';

export class ResetDto {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 2,
  })
  password: string;

  @IsJWT()
  token: string;
}
