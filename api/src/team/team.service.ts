import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Player } from 'src/player/entities/player.entity';
import { PlayerService } from 'src/player/player.service';
import { EntityManager, Repository } from 'typeorm';
import { RegisterTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {

  constructor(
    @Inject('TEAM_REPOSITORY') private repo: Repository<Team>,
    private playerService: PlayerService
  ) { }

  // async create(createTeamDto: RegisterTeamDto) {
  //   const team = this.repo.create(createTeamDto);
  //   return this.repo.save(team);
  // }

  async create(createTeamDto: RegisterTeamDto, manager?: EntityManager) {
    const team = await this.repo.create(createTeamDto);
    if (manager) {
      return manager.save(Team, team);
    }
    return this.repo.save(team);
  }

  async findById(id: number) {
    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }



  async findPlayersByTeam(teamId: number): Promise<Player[]> {
    const team = await this.repo.findOne({
      where: { id: teamId },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (!team.players || team.players.length === 0) {
      throw new NotFoundException('No players found for this team');
    }

    return team.players;
  }

  async findAll() {
    return this.repo.find({
      relations: ['user', 'sport'],
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  async addPlayerByEmail(teamId: number, playerEmail: string): Promise<Player> {
    const team = await this.findById(teamId);

    if (!team)
      throw new NotFoundException('Team not found');

    let player = await this.playerService.findByEmail(playerEmail);
    if (player.team)
      throw new BadRequestException('Player already in a team');

    player = await this.playerService.assignToTeam(player.id, team);
    team.numberOfPlayers += 1;
    await this.repo.save(team);

    return player;
  }

  async removePlayerFromTeam(teamId: number, playerId: number): Promise<Player> {
    const team = await this.repo.findOne({
      where: { id: teamId },
      relations: ['players'],
    });

    if (!team) throw new NotFoundException('Team not found');

    let player = await this.playerService.findById(playerId);

    if (!player) throw new NotFoundException('Player not found');

    if (!player.team || player.team.id !== team.id) {
      throw new BadRequestException('Player does not belong to this team');
    }

    team.players = team.players?.filter(p => p.id !== player.id);

    team.numberOfPlayers -= 1;
    if (team.numberOfPlayers < 0) {
      throw new BadRequestException('Team cannot have negative number of players');
    }

    await this.repo.save(team);

    player = await this.playerService.removeFromTeam(playerId);

    return player;
  }
}
