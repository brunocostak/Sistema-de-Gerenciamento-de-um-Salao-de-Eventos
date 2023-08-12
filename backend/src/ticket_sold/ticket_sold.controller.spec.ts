import { Test, TestingModule } from '@nestjs/testing';
import { TicketSoldController } from './ticket_sold.controller';

describe('TicketSoldController', () => {
  let controller: TicketSoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketSoldController],
    }).compile();

    controller = module.get<TicketSoldController>(TicketSoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
