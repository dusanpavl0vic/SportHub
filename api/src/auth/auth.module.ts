import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoachModule } from 'src/coach/coach.module';
import { PlayerModule } from 'src/player/player.module';
import { TeamModule } from 'src/team/team.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({

  imports: [JwtModule.register({
  }),
    PlayerModule,
    TeamModule,
    CoachModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
