import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './auth/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { PublicTeamModule } from './public-team/public-team.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { TeamSecureController } from './teams/team-secure/team-secure.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    AuthModule,
    PlayerModule,
    TeamModule,
    PrismaModule,
    PublicTeamModule,
    ScheduleModule,
    AnnouncementModule,
  ],
  controllers: [TeamSecureController],
  
})
export class AppModule {}
