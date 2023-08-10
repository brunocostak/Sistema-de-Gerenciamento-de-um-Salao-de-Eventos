import { Decimal } from '@prisma/client/runtime/library';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDecimal,
} from 'class-validator';

export class TicketCreateDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDecimal()
  @IsNotEmpty()
  price: Decimal;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
