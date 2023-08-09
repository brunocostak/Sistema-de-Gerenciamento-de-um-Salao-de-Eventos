import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userSeed = async () => {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    },
  });
};

const locationSeed = async () => {
  await prisma.location.create({
    data: {
      name: 'Location 1',
      description: 'Description 1',
      address: 'Address 1',
      city: 'Rio Grande',
      state: 'RS',
      cep: '96200000',
    },
  });
};

const eventSeed = async () => {
  await prisma.event.create({
    data: {
      name: 'Event 1',
      description: 'Description 1',
      type: 'musical',
      closed: false,
      date: new Date(),
      user: {
        connect: {
          id: 1,
        },
      },
      location: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.event.create({
    data: {
      name: 'Event 2',
      description: 'Description 2',
      type: 'gratuito',
      closed: false,
      date: new Date(),
      user: {
        connect: {
          id: 1,
        },
      },
      location: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.event.create({
    data: {
      name: 'Event 3',
      description: 'Description 3',
      type: 'fechado',
      closed: true,
      date: new Date(),
      user: {
        connect: {
          id: 1,
        },
      },
      location: {
        connect: {
          id: 1,
        },
      },
    },
  });
};
locationSeed();
userSeed();
eventSeed();
