import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [LocationService, PrismaService, UserService],
})
export class LocationModule {}
