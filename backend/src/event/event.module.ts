import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, PrismaService, UserService],
})
export class EventModule {}
