import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationCreateDto } from './dtos/create-location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // CRUD Routes

  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @Post()
  async create(@Body() data: LocationCreateDto) {
    return this.locationService.create(data);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() data: LocationCreateDto) {
    return this.locationService.update(id, data);
  }

  @Put('delete/:id')
  async delete(@Param('id') id: number) {
    return this.locationService.delete(id);
  }
}
