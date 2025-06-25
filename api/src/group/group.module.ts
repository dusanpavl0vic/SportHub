import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupService } from './group.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupService, ...groupProviders],
  exports: [GroupService, ...groupProviders]
})
export class GroupModule { }
