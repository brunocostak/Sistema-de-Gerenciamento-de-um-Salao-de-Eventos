import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserTicketDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  ticketId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
