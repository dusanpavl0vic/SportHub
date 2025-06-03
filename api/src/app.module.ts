import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoachModule } from './coach/coach.module';
import { PlayerModule } from './player/player.module';
import { SportModule } from './sport/sport.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    UserModule,
    PlayerModule,
    TeamModule,
    CoachModule,
    SportModule,
  ],

})
export class AppModule { }
