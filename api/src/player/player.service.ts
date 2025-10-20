import { BadRequestException, forwardRef, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { PLAYER_PROFILEIMAGE_BASE_URL } from 'src/config/constants';
import { Membership } from 'src/membership/entities/membership.entity';
import { MembershipService } from 'src/membership/membership.service';
import { Team } from 'src/team/entities/team.entity';
import { TeamService } from 'src/team/team.service';
import { UserService } from 'src/user/user.service';
import { EntityManager, Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PlayerDto, RegisterPlayerDto } from './dto/create-player.dto';
import { PlayerInfoDto, ReturnPlayerDto, UpdatePlayerDto, UpdatePlayerProfileImageDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';


@Injectable()
export class PlayerService {
  constructor(
    @Inject('PLAYER_REPOSITORY') private repo: Repository<Player>,
    @Inject('TEAM_REPOSITORY') private repoT: Repository<Team>,
    private userService: UserService,
    private teamService: TeamService,
    @Inject(forwardRef(() => MembershipService))
    private readonly membershipService: MembershipService,
  ) { }

  async findByIdWithOutUser(
    id: number,
  ): Promise<PlayerDto> {
    const player = await this.repo.findOne({
      where: { id: id },
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    const team = await this.membershipService.playerInTeam(id);

    const playerdto: PlayerDto = { ...player, teamId: team?.id }

    return playerdto;
  }

  async findById(
    id: number,
  ): Promise<Player> {
    const player = await this.repo.findOne({
      where: { id: id },
      relations: ['user',],
    });

    if (!player) {
      console.log("Player not found with ID:", id);
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    console.log("Player found:", player);

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async findByIdWithMemberships(
    id: number,
  ): Promise<Player> {
    const player = await this.repo.findOne({
      where: { id: id },
      relations: ['memberships',],
    });

    if (!player) {
      console.log("Player not found with ID:", id);
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    console.log("Player found:", player);

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async create(
    createPlayerDto: RegisterPlayerDto,
    manager?: EntityManager) {
    const player = this.repo.create(createPlayerDto);
    if (manager) {
      return manager.save(Player, player);
    }

    return this.repo.save(player);
  }

  async findByUserId(
    userId: number,
  ): Promise<PlayerDto> {
    const player = await this.repo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!player) {
      throw new NotFoundException(`Player with user ID ${userId} not found`);
    }
    return player;
  }


  async findByEmail(
    email: string,
  ): Promise<Player> {
    const player = await this.repo.findOne({
      where: { user: { email } }, relations: ['user']
    });
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async findAll(): Promise<{ players: Player[]; count: number }> {
    const [players, count] = await this.repo.findAndCount({
      relations: ['user']
    });
    if (!players) {
      throw new NotFoundException('No players found');
    }
    return { players, count };
  }

  async updatePlayer(
    playerId: number,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<ReturnPlayerDto> {
    const player = await this.findById(playerId);
    if (!player)
      throw new NotFoundException('Player not found');

    Object.assign(player, updatePlayerDto);

    const update = await this.repo.save(player);

    return {
      id: update.id,
      firstname: update.firstname,
      lastname: update.lastname,
      phoneNumber: update.phoneNumber,
      birthdate: update.birthdate,
      city: update.city,
    }
  }

  async removePlayer(
    playerId: number,
  ): Promise<Player> {
    const player = await this.repo
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.user', 'user')
      .leftJoinAndSelect('player.memberships', 'membership')
      .leftJoinAndSelect('membership.team', 'team')
      .where('player.id = :id', { id: playerId })
      .getOne();

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const hasActiveMembership = player.memberships.some(m => m.status === 'in_team');

    if (hasActiveMembership) {
      for (const membership of player.memberships) {
        if (membership.status === 'in_team' && membership.team) {
          await this.repoT.update(membership.team.id, {
            numberOfPlayers: membership.team.numberOfPlayers - 1,
          });
        }
      }
    }

    await this.repo.remove(player);
    await this.userService.remove(player.user.id);

    return player;
  }

  async changePassword(
    playerId: number,
    passwords: ChangePasswordDto
  ): Promise<{ message: string }> {
    const player = await this.findById(playerId);
    if (!player)
      throw new NotFoundException('Player not found');


    if (!this.userService.changePassword(player.user, passwords)) {
      throw new BadRequestException({ message: 'Failed to change password' });
    }

    return { message: 'Password changed successfully' };
  }

  async uploadImage(
    playerId: number,
    imageName: string,
  ): Promise<UpdatePlayerProfileImageDto> {
    const player = await this.findById(playerId);
    if (!player)
      throw new NotFoundException('Player not found');
    await this.repo.update(player.id, { profilePicture: PLAYER_PROFILEIMAGE_BASE_URL + playerId + "/" + imageName });
    console.log("Player profile picture updated:", player.profilePicture);
    return {
      id: player.id,
      profileImage: PLAYER_PROFILEIMAGE_BASE_URL + playerId + "/" + imageName,
    };
  }




  async addMembership(
    playerId: number,
    membership: Membership,
  ): Promise<Player> {
    const player = await this.findById(playerId);
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    player.memberships.push(membership);
    return this.repo.save(player);
  }

  async allGroups(
    playerId: number,
  ) {
    const team = await this.myTeam(playerId);

    if (!team) {
      throw new BadRequestException('Player is not in a team');
    }

    return this.teamService.allGroups(team.id);
  }

  async showTeammates(
    playerId: number,
  ) {
    const team = await this.myTeam(playerId);

    if (!team) {
      throw new BadRequestException('Player is not in a team');
    }

    const teammates = this.teamService.findAllTeamPlayersActive(team.id);

    return (await teammates).map(teammate => teammate.player);
  }

  async requestToJoinTeam(
    playerId: number,
    teamId: number,
  ) {
    return this.membershipService.requestToJoinTeam(playerId, teamId);
  }

  async leaveTeam(
    teamId: number,
    playerId: number,
  ) {
    return this.membershipService.leftPlayer(teamId, playerId);
  }

  async myTeam(
    playerId: number,
  ) {
    const team = await this.membershipService.playerInTeam(playerId);

    return team;
  }

  async returnPlayerProfile(
    playerId: number
  ): Promise<PlayerInfoDto> {
    const player = await this.findById(playerId);

    const team = await this.membershipService.playerInTeam(playerId);

    return {
      id: player.id,
      firstname: player.firstname,
      lastname: player.lastname,
      birthdate: player.birthdate,
      city: player.city,
      team: team
    }
  }
}
