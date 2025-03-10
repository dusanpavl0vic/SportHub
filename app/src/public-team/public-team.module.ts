import { Module } from '@nestjs/common';
import { PublicTeamController } from './public-team.controller';
import { PublicTeamService } from './public-team.service';

@Module({
  controllers: [PublicTeamController],
  providers: [PublicTeamService]
})
export class PublicTeamModule {}
