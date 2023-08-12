import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTicketIdsByEventId(eventId: number) {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      Ticket: true,
    },
  });

  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  const ticketIds = event.Ticket.map((ticket) => ticket.id);
  return ticketIds;
}
