import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LocationCreateDto {
  @IsOptional()
  @IsNumber()
  id?: never;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsNumber()
  @MinLength(8)
  @MaxLength(8)
  cep: string;
}
