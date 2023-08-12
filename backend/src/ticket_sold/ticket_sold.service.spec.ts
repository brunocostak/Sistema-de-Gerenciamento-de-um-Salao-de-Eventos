import { Test, TestingModule } from '@nestjs/testing';
import { TicketSoldService } from './ticket_sold.service';

describe('TicketSoldService', () => {
  let service: TicketSoldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketSoldService],
    }).compile();

    service = module.get<TicketSoldService>(TicketSoldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
