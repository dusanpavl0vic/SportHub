import { Team } from "@prisma/client";
import { CreateTeamDto, ShowTeamCardDto, ShowTeamDto, TeamDto, UpdateTeamDto } from "src/dtos/dto";

export class TeamMapper {
    static toTeamDto(team: Team): TeamDto {
        return {
            id: team.id,
            role: team.role,
            email: team.email,
            password: team.password,
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

    static toShowTeamDto(team: Team): ShowTeamDto {
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

    static toShowTeamCardDto(team: Team): ShowTeamCardDto {
        return {
            id: team.id,
            teamName: team.teamName,
            profilePicture: team.profilePicture ?? '',
            city: team.city,
            numberOfPlayers: team.numberOfPlayers,
            sport: team.sport,
        };
    }

    static toCreateTeamDto(data: any): CreateTeamDto {
        return {
            email: data.email,
            password: data.password,
            teamName: data.teamName,
            city: data.city,
            sport: data.sport,
        };
    }

    static toUpdateTeamDto(data: any): UpdateTeamDto {
        return {
            teamName: data.teamName,
            profilePicture: data.profilePicture,
            city: data.city,
            sport: data.sport,
            coachName: data.coachName,
            coachPhoneNumber: data.coachPhoneNumber,
            location: data.location,
        };
    }
}
