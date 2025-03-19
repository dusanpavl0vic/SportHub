import { Injectable } from '@nestjs/common';
import { Team } from '@prisma/client';
import { ShowTeamCardDto, ShowTeamDto } from 'src/dto/team.dto';
import { TeamMapper } from 'src/mapper/mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {

    constructor(private prisma: PrismaService) {}
    
    async getTeamsFilters(
        sport?: string,
        city?: string,
        sort?: 'a-z' | 'z-a' | 'memberCountAsc' | 'memberCountDesc',
        skip?: number,
        take?: number,
    ): Promise<ShowTeamCardDto[]> {
        
        const orderBy = this.getSortingOrder(sort);

        const teams: Team[] = await this.prisma.team.findMany({
            skip: skip,
            take: take,
            where: {
                sport: {
                    contains: sport,
                },
                city: {
                    contains: city,
                },
            },
            orderBy,
        });

        return teams.map(TeamMapper.toShowTeamCardDto);

    }

    async getTeamInfo(teamId: number): Promise<ShowTeamDto> {
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            throw new Error('Team not found');
        }

        return TeamMapper.toShowTeamDto(team);

    }

    
    private getSortingOrder(sort?: string) {
        switch (sort) {
            case 'a-z':
                return { teamName: 'asc' } as const;
            case 'z-a':
                return { teamName: 'desc' } as const;
            case 'memberCountAsc':
                return { numberOfPlayers: 'asc' } as const;
            case 'memberCountDesc':
                return { numberOfPlayers: 'desc' } as const;
        }
    }
}
