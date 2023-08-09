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
    if (!events) {
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

  async update(
    id: number,
    data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const event = await this.prisma.event.update({
      where: {
        id,
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
    return 'Event with id ${id} has been updated';
  }

  async delete(id: number): Promise<string | IErrorReturn> {
    const event = await this.prisma.event.delete({
      where: {
        id: id,
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
    date: Date,
    locationId: number,
    userId: number,
    type: string
  ): Promise<Event[] | IErrorReturn> {
    const whereClause: IEventFilter = {};

    if (name) whereClause.name = name;
    if (date) whereClause.date = date;
    if (locationId) whereClause.locationId = locationId;
    if (userId) whereClause.userId = userId;
    if (type) whereClause.type = type;

    const events = await this.prisma.event.findMany({
      where: whereClause,
    });
    if (!events) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Events not found',
      };
    }
    return events;
  }
}
