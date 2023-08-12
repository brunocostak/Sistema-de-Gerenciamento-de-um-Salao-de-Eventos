import { Module } from '@nestjs/common';
import { TicketSoldController } from './ticket_sold.controller';
import { TicketSoldService } from './ticket_sold.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TicketSoldController],
  providers: [TicketSoldService, PrismaService],
})
export class TicketSoldModule {}
