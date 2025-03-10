import { Injectable } from '@nestjs/common';
import { Team } from '@prisma/client';
import { ShowTeamCardDto, ShowTeamDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicTeamService {
    constructor(private prisma: PrismaService) {}

    async getTeams(
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

        return teams.map((team) => ({
            id: team.id,
            teamName: team.teamName,
            profilePicture: team.profilePicture ?? '',
            city: team.city,
            numberOfPlayers: team.numberOfPlayers,
            sport: team.sport,
        }));

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

        return {
            id: team.id,
            teamName: team.teamName,
            profilePicture: team.profilePicture ?? '',
            city: team.city,
            numberOfPlayers: team.numberOfPlayers,
            sport: team.sport,
            coachName: team.coachName ?? '',
            coachPhoneNumber: team.coachPhoneNumber ?? '',
            location: team.location ?? '',
        };

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
