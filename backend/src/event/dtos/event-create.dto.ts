import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDate,
  MinLength,
  MaxLength,
} from 'class-validator';

export class EventCreateDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsBoolean()
  @IsNotEmpty()
  closed: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;
}
