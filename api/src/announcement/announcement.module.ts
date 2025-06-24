import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnnouncementController } from './announcement.controller';
import { announcementProviders } from './announcement.providers';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService, ...announcementProviders],
  exports: [AnnouncementService, ...announcementProviders]
})
export class AnnouncementModule { }
