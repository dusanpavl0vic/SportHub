import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlayerStatus } from 'src/enum/player_status.enum';
import { PlayerService } from 'src/player/player.service';
import { TeamService } from 'src/team/team.service';
import { In, Repository } from 'typeorm';
import { MembershipDto } from './dto/membership.dto';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @Inject('MEMBERSHIP_REPOSITORY') private repo: Repository<Membership>,

    private playerService: PlayerService,
    private teamService: TeamService,
  ) { }

  async requestToJoinTeam(
    playerId: number,
    teamId: number,
  ): Promise<MembershipDto> {

    const currentlyInTeam = await this.repo.findOne({
      where: {
        player: { id: playerId },
        status: In([PlayerStatus.PENDING, PlayerStatus.IN_TEAM]),
      },
    });

    if (currentlyInTeam) {
      throw new BadRequestException("You are currently in a team or waiting to join one.");
    }

    const existingActive = await this.activeMembership(playerId, teamId);

    if (existingActive) {
      throw new BadRequestException('Player already in this team or waiting approval');
    }

    const player = await this.playerService.findById(playerId);
    if (!player) {
      throw new NotFoundException('Player not found');
    }

    console.log("Ovde sam 3");

    const team = await this.teamService.findById(teamId);
    if (!team) {
      throw new NotFoundException('Player not found');
    }

    const membership = this.repo.create({
      player: player,
      team: team,
      status: PlayerStatus.PENDING,
      joinedAt: null,
    });

    const saved = await this.repo.save(membership);



    return {
      status: saved.status,
      joinedAt: saved.joinedAt,
      leftAt: saved.leftAt,
    };
  }

  async acceptPlayer(
    teamId: number,
    playerId: number,
  ) {

    const membership = await this.repo.findOne({
      where: {
        player: { id: playerId },
        team: { id: teamId },
        status: PlayerStatus.PENDING,
      },
    });

    if (!membership) {
      throw new NotFoundException('Membership not found or not pending');
    }

    membership.status = PlayerStatus.IN_TEAM;
    membership.joinedAt = new Date();

    this.teamService.incrementPlayerCount(teamId);

    return this.repo.save(membership);
  }

  async refusePlayer(
    teamId: number,
    playerId: number,
  ) {

    const membership = await this.repo.findOne({
      where: {
        player: { id: playerId },
        team: { id: teamId },
        status: PlayerStatus.PENDING,
      },
    });

    if (!membership) {
      throw new NotFoundException('Membership not pending');
    }

    this.repo.delete(membership.id);

    console.log(membership.player);
    return membership.player;
  }

  async leftPlayer(
    teamId: number,
    playerId: number,
  ) {

    const membership = await this.activeMembership(playerId, teamId);

    if (!membership) {
      throw new NotFoundException('Membership not found or not pending');
    }


    if (membership.status == PlayerStatus.PENDING) {
      return this.repo.delete(membership.id);
    }
    else if (membership.status == PlayerStatus.IN_TEAM) {
      membership.status = PlayerStatus.LEFT;
      membership.leftAt = new Date();

      this.teamService.decrementPlayerCount(teamId);
      return this.repo.save(membership);
    }
    else {
      throw new BadRequestException('Player cannot leave because they are not in the team');
    }
  }



  private async activeMembership(
    playerId: number,
    teamId: number,
  ) {
    return await this.repo.findOne({
      where: {
        player: { id: playerId },
        team: { id: teamId },
        status: In([PlayerStatus.PENDING, PlayerStatus.IN_TEAM]),
      },
    });
  }




}