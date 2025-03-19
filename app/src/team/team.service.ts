import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { ShowTeamCardDto, ShowTeamDto } from 'src/dto/team.dto';
import { TeamMapper } from 'src/mapper/mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {

    constructor(private prisma: PrismaService) {}
    
    async getTeamsFilters(
        page: number,
        take: number,
        sport?: string,
        city?: string,
        sort?: 'a-z' | 'z-a' | 'memberCountAsc' | 'memberCountDesc',
    ): Promise<ShowTeamCardDto[]> {
        try {
            const orderBy = this.getSortingOrder(sort);

            if (page == undefined && take == undefined) {
                throw new Error('You must provide skip and take parameters');
            }

            const teams: Team[] = await this.prisma.team.findMany({
                skip: page * take,
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

        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch teams: ${error.message}`);
        }

    }

    async getTeamInfo(teamId: number): Promise<ShowTeamDto> {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    id: teamId,
                },
            });

            if (!team) {
                throw new NotFoundException(`Team with ID ${teamId} not found`);
            }

            return TeamMapper.toShowTeamDto(team);
        }
        catch (error) {
            throw new InternalServerErrorException(`Failed to fetch team: ${error.message}`);
        }
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
