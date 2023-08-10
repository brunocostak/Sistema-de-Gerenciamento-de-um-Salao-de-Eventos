import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventCreateDto } from './dtos/event-create.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { Event } from '@prisma/client';
import IEventFilter from 'src/interfaces/IEventFilter';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  // CRUD Routes

  async findAll(): Promise<Event[] | IErrorReturn> {
    const events = await this.prisma.event.findMany();
    if (!events || events.length === 0) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Events not found',
      };
    }
    return events;
  }

  async create(data: EventCreateDto): Promise<Event | IErrorReturn> {
    const event = await this.prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        closed: data.closed,
        date: data.date,
        user: {
          connect: {
            id: data.userId,
          },
        },
        location: {
          connect: {
            id: data.locationId,
          },
        },
      },
    });
    if (!event) {
      return {
        error: 'Not created',
        statusCode: 400,
        message: 'Event not created',
      };
    }
    return event;
  }

  async createEventWithTickets(data: EventCreateDto) {
    const { Ticket, ...eventData } = data;

    const createdEvent = await this.prisma.event.create({
      data: {
        ...eventData,
      },
    });

    Ticket.map(async (ticket) => {
      console.log(ticket);
      return await this.prisma.ticket.create({
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
    });

    return createdEvent;
  }

  async update(
    id: number,
    data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const idNumber = Number(id);
    console.log(data);
    const event = await this.prisma.event.update({
      where: {
        id: idNumber,
      },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        closed: data.closed,
        date: data.date,
        user: {
          connect: {
            id: data.userId,
          },
        },
        location: {
          connect: {
            id: data.locationId,
          },
        },
      },
    });
    if (!event) {
      return {
        error: 'Not updated',
        statusCode: 400,
        message: 'Event not updated',
      };
    }
    return `Event with id ${idNumber} has been updated`;
  }

  async delete(id: number): Promise<string | IErrorReturn> {
    const event = await this.prisma.event.delete({
      where: {
        id: Number(id),
      },
    });
    if (!event) {
      return {
        error: 'Not deleted',
        statusCode: 400,
        message: 'Event not deleted',
      };
    }
    return `Event with id ${id} has been deleted`;
  }

  // Filter Routes

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
