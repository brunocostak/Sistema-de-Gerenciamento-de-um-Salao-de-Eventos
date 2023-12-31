import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { location } from '@prisma/client';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { LocationCreateDto } from './dtos/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  // CRUD Routes
  async findAll(): Promise<location[] | IErrorReturn> {
    const locations = await this.prisma.location.findMany();
    if (!locations || locations.length === 0) {
      return {
        error: 'Not found',
        statusCode: 404,
        message: 'Locations not found',
      };
    }
    return locations;
  }

  async create(data: LocationCreateDto): Promise<location | IErrorReturn> {
    const location = await this.prisma.location.create({ data });
    if (!location) {
      return {
        error: 'Not created',
        statusCode: 400,
        message: 'Location not created',
      };
    }
    return location;
  }

  async update(
    id: string,
    data: LocationCreateDto
  ): Promise<string | IErrorReturn> {
    const idNumber = Number(id);
    const location = await this.prisma.location.update({
      where: { id: idNumber },
      data,
    });
    if (!location) {
      return {
        error: 'Not updated',
        statusCode: 400,
        message: 'Location not updated',
      };
    }
    return `Location with id: ${id} updated`;
  }

  async delete(id: string): Promise<string | IErrorReturn> {
    const idNumber = Number(id);
    const location = await this.prisma.location.delete({
      where: { id: idNumber },
    });
    if (!location) {
      return {
        error: 'Not deleted',
        statusCode: 400,
        message: 'Location not deleted',
      };
    }
    return `Location with id: ${id} deleted`;
  }
}
