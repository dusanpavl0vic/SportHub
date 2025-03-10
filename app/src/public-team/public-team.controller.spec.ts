import { Test, TestingModule } from '@nestjs/testing';
import { PublicTeamController } from './public-team.controller';

describe('PublicTeamController', () => {
  let controller: PublicTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicTeamController],
    }).compile();

    controller = module.get<PublicTeamController>(PublicTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
