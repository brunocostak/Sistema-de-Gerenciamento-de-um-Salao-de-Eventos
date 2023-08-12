import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserTicketDto } from './dtos/CreateUserTicket.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';

@Injectable()
export class TicketSoldService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserTicket(
    data: CreateUserTicketDto
  ): Promise<CreateUserTicketDto | IErrorReturn> {
    const { ticketId, userId } = data;

    const ticketStillAvaible = await this.prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!ticketStillAvaible) {
      return {
        error: 'Bad Request',
        statusCode: 400,
        message: 'This ticket is not available',
      };
    }
    if (ticketStillAvaible && ticketStillAvaible.amount > 0) {
      const ticketSold = await this.prisma.soldTickets.create({
        data: {
          ticketId,
          userId,
        },
      });
      if (ticketId) {
        await this.prisma.ticket.update({
          where: {
            id: ticketId,
          },
          data: {
            amount: {
              decrement: 1,
            },
          },
        });
      }
      if (!ticketSold) {
        return {
          error: 'Bad Request',
          statusCode: 400,
          message: 'This ticket is not available',
        };
      }
      return ticketSold;
    }
  }
}
