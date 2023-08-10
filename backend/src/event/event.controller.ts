import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  async createEventsAndTickets(
    @Body() data: EventCreateDto
  ): Promise<Event | IErrorReturn> {
    const event = await this.eventService.createEventWithTickets(data);
    return event;
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const event = await this.eventService.update(id, data);
    return event;
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<string | IErrorReturn> {
    const event = await this.eventService.delete(id);
    return event;
  }

  @Get('find')
  async find(
    @Query('name') name: string,
    @Query('date') date: string,
    @Query('locationId') locationId: number,
    @Query('userId') userId: number,
    @Query('type') type: string,
    @Query('closed') closed: string
  ): Promise<Event[] | IErrorReturn> {
    const event = await this.eventService.find(
      name,
      date,
      locationId,
      userId,
      type,
      closed
    );
    return event;
  }

  @Get('page')
  async paginate(
    @Query('page') page: string,
    @Query('take') perPage: string
  ): Promise<Event[] | IErrorReturn> {
    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);
    return this.eventService.paginate(pageNumber, perPageNumber);
  }
}
