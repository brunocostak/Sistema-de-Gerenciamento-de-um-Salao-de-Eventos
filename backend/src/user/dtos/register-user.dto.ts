import { IsString, IsOptional, IsNotEmpty, IsNumber, MinLength, MaxLength } from "class-validator";

export class UserRegisterDTO{
    @IsOptional()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string
}