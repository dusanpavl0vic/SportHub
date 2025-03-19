import { Test, TestingModule } from '@nestjs/testing';
import { TeamSecureController } from './team-secure.controller';

describe('TeamSecureController', () => {
  let controller: TeamSecureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamSecureController],
    }).compile();

    controller = module.get<TeamSecureController>(TeamSecureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
