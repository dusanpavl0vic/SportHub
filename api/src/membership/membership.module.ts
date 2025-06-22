import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayerModule } from 'src/player/player.module';
import { playerProviders } from 'src/player/player.providers';
import { TeamModule } from 'src/team/team.module';
import { teamProviders } from 'src/team/team.providers';
import { MembershipController } from './membership.controller';
import { membershipProviders } from './membership.providers';
import { MembershipService } from './membership.service';

@Module({
  imports: [DatabaseModule,
    forwardRef(() => PlayerModule),
    forwardRef(() => TeamModule),
  ],
  controllers: [MembershipController],
  providers: [MembershipService, ...membershipProviders, ...playerProviders, ...teamProviders],
  exports: [MembershipService],
})
export class MembershipModule { }
