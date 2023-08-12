import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TicketSoldService } from './ticket_sold.service';
import { CreateUserTicketDto } from './dtos/CreateUserTicket.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { UserGuard } from 'src/user/user.guard';

@Controller('ticket-sold')
export class TicketSoldController {
  constructor(private readonly ticketSoldService: TicketSoldService) {}

  @UseGuards(UserGuard)
  @Post()
  async create(
    @Body() data: CreateUserTicketDto
  ): Promise<CreateUserTicketDto | IErrorReturn> {
    return await this.ticketSoldService.createUserTicket(data);
  }
}
