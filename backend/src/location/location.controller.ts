import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationCreateDto } from './dtos/create-location.dto';
import { AuthGuard } from '../user/admin.guard';
import { UserGuard } from 'src/user/user.guard';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // CRUD Routes
  @UseGuards(UserGuard)
  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() data: LocationCreateDto) {
    return this.locationService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: LocationCreateDto) {
    return this.locationService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.locationService.delete(id);
  }
}
