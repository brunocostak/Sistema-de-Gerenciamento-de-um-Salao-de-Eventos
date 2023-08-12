import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCreateDto } from './dtos/event-create.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { Event } from '@prisma/client';
import { UserGuard } from 'src/user/user.guard';
import { AuthGuard } from 'src/user/admin.guard';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(UserGuard)
  @Get()
  async findAll(): Promise<Event[] | IErrorReturn> {
    const events = await this.eventService.findAll();
    return events;
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createEventsAndTickets(
    @Body() data: EventCreateDto
  ): Promise<Event | IErrorReturn> {
    const event = await this.eventService.createEventWithTickets(data);
    return event;
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: EventCreateDto
  ): Promise<string | IErrorReturn> {
    const event = await this.eventService.updateEventWithTickets(id, data);
    return event;
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<string | IErrorReturn> {
    const event = await this.eventService.deleteEventWithTickets(Number(id));
    return event;
  }

  @UseGuards(UserGuard)
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

  @UseGuards(UserGuard)
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
