import { Body, Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { TeamService } from './team.service';



@Controller('team')
export class TeamController {

    constructor(private teamService: TeamService) {}

    @Get('teamsFilters')
    getTeamsFilters(
        @Query('page', ParseIntPipe) page: number,
        @Query('take', ParseIntPipe) take: number,
        @Query('sport') sport?: string,
        @Query('city') city?: string,
        @Query('sort') sort?: 'a-z' | 'z-a' | 'memberCountAsc' | 'memberCountDesc',
    ) {
        return this.teamService.getTeamsFilters(
            page,
            take,
            sport,
            city,
            sort,
        );
    }

    @Get('teamInfo')
    getTeamInfo(
        @Query('teamId', ParseIntPipe) teamId: number,
    ) {
        return this.teamService.getTeamInfo(teamId);
    }


}
