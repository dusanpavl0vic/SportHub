import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SportController } from './sport.controller';
import { sportProviders } from './sport.providers';
import { SportService } from './sport.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SportController],
  providers: [SportService, ...sportProviders],
  exports: [SportService],
})
export class SportModule { }
