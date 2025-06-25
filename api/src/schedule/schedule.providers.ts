import { DataSource } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

export const scheduleProviders = [
  {
    provide: 'SCHEDULE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Schedule),
    inject: ['DATA_SOURCE'],
  },
];