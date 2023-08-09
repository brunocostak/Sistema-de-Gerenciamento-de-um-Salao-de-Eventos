import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventCreateDto } from './dtos/event-create.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

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
}
