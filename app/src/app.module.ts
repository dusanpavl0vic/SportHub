import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    AuthModule,
    PlayerModule,
    TeamModule,
    PrismaModule,
    ScheduleModule,
    AnnouncementModule,
  ],
  
})
export class AppModule {}
