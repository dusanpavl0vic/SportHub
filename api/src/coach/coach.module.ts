import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TeamModule } from 'src/team/team.module';
import { TeamService } from 'src/team/team.service';
import { CoachController } from './coach.controller';
import { coachProviders } from './coach.providers';
import { CoachService } from './coach.service';

@Module({
  imports: [TeamModule, DatabaseModule],
  controllers: [CoachController],
  providers: [CoachService, TeamService, ...coachProviders],
  exports: [CoachService],
})
export class CoachModule { }
