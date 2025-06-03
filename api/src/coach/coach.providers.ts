import { DataSource } from 'typeorm';
import { Coach } from './entities/coach.entity';

export const coachProviders = [
  {
    provide: 'COACH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Coach),
    inject: ['DATA_SOURCE'],
  },
];