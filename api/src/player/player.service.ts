import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Repository } from 'typeorm';
import { RegisterPlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(@Inject('PLAYER_REPOSITORY') private repo: Repository<Player>) { }


  async create(createPlayerDto: RegisterPlayerDto) {
    const player = this.repo.create(createPlayerDto);
    return this.repo.save(player);
  }

  async findById(id: number): Promise<Player> {
    const player = await this.repo.findOne({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
