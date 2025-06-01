import { Player } from "@prisma/client";
import { PlayerDto, ReturnPlayerDto, CreatePlayerDto, UpdatePlayerDto } from "src/dtos/dto";

export class PlayerMapper {
    static toPlayerDto(player: Player): PlayerDto {
        return {
            id: player.id,
            role: player.role,
            email: player.email,
            password: player.password, // Be cautious when returning passwords!
            firstName: player.firstName,
            lastName: player.lastName,
            phoneNumber: player.phoneNumber ?? undefined,
            profilePicture: player.profilePicture ?? undefined,
            birthDate: player.birthDate ?? undefined,
            city: player.city,
            teamId: player.teamId ?? undefined,
        };
    }

    static toReturnPlayerDto(player: Player): ReturnPlayerDto {
        return {
            id: player.id,
            email: player.email,
            firstName: player.firstName,
            lastName: player.lastName,
            phoneNumber: player.phoneNumber ?? null,
            profilePicture: player.profilePicture ?? null,
            birthDate: player.birthDate ?? null,
            city: player.city,
            teamId: player.teamId ?? null,
        };
    }

    static toCreatePlayerDto(data: any): CreatePlayerDto {
        return {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            city: data.city,
        };
    }

    static toUpdatePlayerDto(data: any): UpdatePlayerDto {
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            birthDate: data.birthDate,
            city: data.city,
        };
    }
}
