import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
// import { CoachModule } from './coach/coach.module';
import { MembershipModule } from './membership/membership.module';
import { PlayerModule } from './player/player.module';
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
    // MulterModule.register({
    //   dest: './public',
    // }),

    AuthModule,
    UserModule,
    PlayerModule,
    TeamModule,
    // CoachModule,
    SportModule,
    MembershipModule,
  ],

})
export class AppModule { }
