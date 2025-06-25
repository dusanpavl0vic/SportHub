import { forwardRef, Module } from '@nestjs/common';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { DatabaseModule } from 'src/database/database.module';
import { GroupModule } from 'src/group/group.module';
import { MembershipModule } from 'src/membership/membership.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { UserModule } from 'src/user/user.module';
import { TeamController } from './team.controller';
import { teamProviders } from './team.providers';
import { TeamService } from './team.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => MembershipModule),
    UserModule,
    AnnouncementModule,
    GroupModule,
    ScheduleModule,
  ],
  controllers: [TeamController],
  providers: [TeamService, ...teamProviders],
  exports: [TeamService, ...teamProviders],
})
export class TeamModule { }

