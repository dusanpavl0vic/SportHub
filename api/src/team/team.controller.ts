import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Player } from 'src/player/entities/player.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }

  @Post(':teamId/players')
  async addPlayerByEmail(
    @Body('email') email: string,
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<Player> {
    return this.teamService.addPlayerByEmail(teamId, email);
  }

  @Delete(':teamId/players/:playerId')
  async removePlayerFromTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ): Promise<Player> {
    return this.teamService.removePlayerFromTeam(teamId, playerId);
  }
}
