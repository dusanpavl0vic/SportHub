import { Test, TestingModule } from '@nestjs/testing';
import { PublicTeamService } from './public-team.service';

describe('PublicTeamService', () => {
  let service: PublicTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicTeamService],
    }).compile();

    service = module.get<PublicTeamService>(PublicTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
