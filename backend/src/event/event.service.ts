import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventCreateDto } from './dtos/event-create.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { Event } from '@prisma/client';
import IEventFilter from 'src/interfaces/IEventFilter';
import { getTicketIdsByEventId } from 'src/utils/getHelpers';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  // CRUD Routes

  async findAll(): Promise<Event[] | IErrorReturn> {
    const events = await this.prisma.event.findMany({
      include: {
        Ticket: true,
      },
    });
    if (!events || events.length === 0) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Events not found',
      };
    }
    return events;
  }

  async createEventWithTickets(data: EventCreateDto) {
    const { Ticket, ...eventData } = data;

    const createdEvent = await this.prisma.event.create({
      data: {
        ...eventData,
      },
    });

    const createdTickets = await Promise.all(
      (
        Ticket || [
          {
            type: 'default',
            price: 0,
            amount: 0,
          },
        ]
      ).map(async (ticket) => {
        const createdTicket = await this.prisma.ticket.create({
          data: {
            type: ticket.type,
            price: ticket.price,
            amount: ticket.amount,
            event: {
              connect: {
                id: createdEvent.id,
              },
            },
          },
        });
        return createdTicket;
      })
    );

    return {
      ...createdEvent,
      Ticket: createdTickets,
    };
  }

  async updateEventWithTickets(
    eventId: number,
    data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const { Ticket, ...eventData } = data;
    const idNumber = Number(eventId);

    // Atualizar dados do evento
    await this.prisma.event.update({
      where: {
        id: idNumber,
      },
      data: {
        name: eventData.name,
        description: eventData.description,
        type: eventData.type,
        closed: eventData.closed,
        date: eventData.date,
        hour: eventData.hour,
        eventPassword: eventData.eventPassword,
        user: {
          connect: {
            id: eventData.userId,
          },
        },
        location: {
          connect: {
            id: eventData.locationId,
          },
        },
      },
    });

    const findTicketsId = await getTicketIdsByEventId(idNumber);
    console.log('findTicketsId', findTicketsId);

    // Atualizar dados dos ingressos
    if (Ticket && findTicketsId.length > 0) {
      await Promise.all(
        Ticket.map(async (ticket, index) => {
          // console.log('wtf', findTicketsId[index]);
          await this.prisma.ticket.update({
            where: {
              id: String(findTicketsId[index]), // Use o ID do ingresso para atualização
            },
            data: {
              type: ticket.type,
              price: ticket.price,
              amount: ticket.amount,
            },
          });
        })
      );
    }

    return `Event with id ${eventId} has been updated`;
  }

  async deleteEventWithTickets(eventId: number) {
    // Primeiro, encontre os IDs dos ingressos associados ao evento
    const ticketIds = await getTicketIdsByEventId(eventId);

    // Delete os ingressos associados ao evento
    await this.prisma.ticket.deleteMany({
      where: {
        id: {
          in: ticketIds,
        },
      },
    });

    // Delete o evento
    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return `Event with id ${eventId} and its associated tickets have been deleted`;
  }

  // Filter Routesa

  async find(
    name: string,
    date: string,
    locationId: number,
    userId: number,
    type: string,
    closed: string
  ): Promise<Event[] | IErrorReturn> {
    const whereClause: IEventFilter = {};

    if (name) whereClause.name = name;
    if (date) whereClause.date = date;
    if (locationId) whereClause.locationId = Number(locationId);
    if (userId) whereClause.userId = Number(userId);
    if (type) whereClause.type = type;
    if (closed) whereClause.closed = closed === 'true' ? true : false;

    const events = await this.prisma.event.findMany({
      where: {
        name: { contains: whereClause.name },
        date: whereClause.date,
        locationId: whereClause.locationId,
        userId: whereClause.userId,
        type: whereClause.type,
        closed: whereClause.closed,
      },
    });
    if (!events || events.length === 0) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Events not found',
      };
    }
    return events;
  }

  async paginate(
    page: number,
    perPage: number
  ): Promise<Event[] | IErrorReturn> {
    const events = await this.prisma.event.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    if (!events || events.length === 0) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Events not found',
      };
    }
    return events;
  }
}
