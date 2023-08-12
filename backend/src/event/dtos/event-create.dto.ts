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
import { TicketCreateDto } from './ticket-create.dto';

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
  date: string;

  @IsBoolean()
  @IsNotEmpty()
  closed: boolean;

  @IsString()
  hour: string;

  @IsOptional()
  @IsString()
  eventPassword: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @IsOptional()
  Ticket?: TicketCreateDto[];
}
