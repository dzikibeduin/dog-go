import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAccountRequestDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
