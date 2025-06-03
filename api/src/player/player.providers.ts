import { DataSource } from 'typeorm';
import { Player } from './entities/player.entity';

export const playerProviders = [
  {
    provide: 'PLAYER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Player),
    inject: ['DATA_SOURCE'],
  },
];