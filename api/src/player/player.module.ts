import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayerController } from './player.controller';
import { playerProviders } from './player.providers';
import { PlayerService } from './player.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlayerController],
  providers: [PlayerService, ...playerProviders],
  exports: [PlayerService],
})
export class PlayerModule { }
