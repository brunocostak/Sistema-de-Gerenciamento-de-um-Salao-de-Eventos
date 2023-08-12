import { IsOptional, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
