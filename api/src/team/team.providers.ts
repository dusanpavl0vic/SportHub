import { DataSource } from 'typeorm';
import { Team } from './entities/team.entity';

export const teamProviders = [
  {
    provide: 'TEAM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Team),
    inject: ['DATA_SOURCE'],
  },
];