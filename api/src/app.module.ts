import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
// import { CoachModule } from './coach/coach.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { GroupModule } from './group/group.module';
import { MembershipModule } from './membership/membership.module';
import { PlayerModule } from './player/player.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SportModule } from './sport/sport.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/',
      },

    ),
    AuthModule,
    UserModule,
    PlayerModule,
    TeamModule,
    SportModule,
    MembershipModule,
    AnnouncementModule,
    GroupModule,
    ScheduleModule,
  ],

})
export class AppModule { }
