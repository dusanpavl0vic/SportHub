import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MembershipModule } from 'src/membership/membership.module';
import { TeamModule } from 'src/team/team.module';
import { teamProviders } from 'src/team/team.providers';
import { UserModule } from 'src/user/user.module';
import { PlayerController } from './player.controller';
import { playerProviders } from './player.providers';
import { PlayerService } from './player.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => MembershipModule),
    UserModule,
    TeamModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService, ...playerProviders, ...teamProviders],
  exports: [PlayerService, ...playerProviders],
})
export class PlayerModule { }
