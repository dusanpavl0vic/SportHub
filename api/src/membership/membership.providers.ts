import { DataSource } from 'typeorm';
import { Membership } from './entities/membership.entity';

export const membershipProviders = [
  {
    provide: 'MEMBERSHIP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Membership),
    inject: ['DATA_SOURCE'],
  },
];