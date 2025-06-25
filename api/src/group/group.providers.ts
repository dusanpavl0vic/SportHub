import { DataSource } from 'typeorm';
import { Group } from './entities/group.entity';

export const groupProviders = [
  {
    provide: 'GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
    inject: ['DATA_SOURCE'],
  },
];