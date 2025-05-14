import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamSecureController } from './team-secure.controller';


@Module({
  providers: [TeamService],
  controllers: [TeamController, TeamSecureController]
})
export class TeamModule {
    
}
