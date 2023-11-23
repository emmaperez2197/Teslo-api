import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail(
    {},
    {
      message: 'The email is not valid.',
    },
  )
  email: string;

  @MinLength(6)
  @MaxLength(50)
  password: string;
}
