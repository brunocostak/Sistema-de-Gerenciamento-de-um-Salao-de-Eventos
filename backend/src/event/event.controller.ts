import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCreateDto } from './dtos/event-create.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { Event } from '@prisma/client';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async findAll(): Promise<Event[] | IErrorReturn> {
    const events = await this.eventService.findAll();
    return events;
  }

  @Post('create')
  async create(@Body() data: EventCreateDto): Promise<Event | IErrorReturn> {
    const event = await this.eventService.create(data);
    return event;
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const event = await this.eventService.update(id, data);
    return event;
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<string | IErrorReturn> {
    const event = await this.eventService.delete(id);
    return event;
  }
}
