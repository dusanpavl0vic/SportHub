import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayerModule } from 'src/player/player.module';
import { TeamController } from './team.controller';
import { teamProviders } from './team.providers';
import { TeamService } from './team.service';

@Module({
  imports: [DatabaseModule, PlayerModule],
  controllers: [TeamController],
  providers: [TeamService, ...teamProviders],
  exports: [TeamService, ...teamProviders, PlayerModule],
})
export class TeamModule { }
