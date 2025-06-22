import { Body, ClassSerializerInterceptor, Controller, Delete, forwardRef, Get, HttpCode, Inject, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { MembershipService } from 'src/membership/membership.service';
import { TeamCardDto } from './dto/card-team.dto';
import { FilterTeamDto } from './dto/filter.dto';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    @Inject(forwardRef(() => MembershipService))
    private readonly membershipService: MembershipService,
  ) { }

  // @Get()
  // findAll() {
  //   return this.teamService.findAll();
  // }



  @Post(':teamId/accept/:playerId')
  async acceptPlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    console.log(typeof teamId, typeof playerId);
    return this.membershipService.acceptPlayer(teamId, playerId);
  }

  @Delete(':teamId/refuse/:playerId')
  @HttpCode(204)
  async refusePlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.refusePlayer(teamId, playerId);
  }

  @Delete(':teamId/left/:playerId')
  @HttpCode(204)
  async leftPlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.leftPlayer(teamId, playerId);
  }

  @Get(':teamId/active-memberships')
  @HttpCode(200)
  async getTeamActiveMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersActive(teamId);
  }

  @Get(':teamId/inactive-memberships')
  @HttpCode(200)
  async getTeamInactiveMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersInactive(teamId);
  }

  @Get(':teamId/pending-memberships')
  @HttpCode(200)
  async getTeamPendingMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersPending(teamId);
  }



  @Post('filter')
  async getFilteredTeams(
    @Body() filterDto: FilterTeamDto,
  ): Promise<{
    data: TeamCardDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    console.log('Filter DTO:', filterDto);
    return this.teamService.getFilteredTeams(filterDto);
  }


  @Delete(':id')
  async removePlayer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Team> {
    return this.teamService.removeTeam(id);
  }
}
