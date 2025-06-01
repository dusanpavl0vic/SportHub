import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PlayerDto, ReturnPlayerDto, UpdatePlayerDto } from 'src/dtos/player.dto';
import { PlayerMapper } from 'src/mapper/mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { cleanData } from 'src/util/clean-data.util';

@Injectable()
export class PlayerService {
    
    constructor(private prisma: PrismaService) {}

    async getPlayerById(
        playerId: number
    ): Promise<ReturnPlayerDto> {
        const player = await this.prisma.player.findUniqueOrThrow({
            where: {
                id: playerId,
            },
        });

        if (!player) {
            throw new NotFoundException(`Player with ID ${playerId} not found.`);
        }

        return PlayerMapper.toReturnPlayerDto(player);
    }

    async getTeam(
        player: Player
    ): Promise<number> {
        if (!player.teamId) {
            throw new NotFoundException('You are not in a team.');
        }

        return player.teamId;
    }

    async getPlayersByIdArray(
        playerIdArray: number[]
    ): Promise<ReturnPlayerDto[]> {
        const players = await this.prisma.player.findMany({
            where: {
                id: { in: playerIdArray },
            },
        });

        if (!players) {
            throw new NotFoundException(`Player with ID ${playerIdArray} not found.`);
        }

        return players.map(PlayerMapper.toReturnPlayerDto);
    }
    
    async updatePlayer(
        playerData: UpdatePlayerDto, 
        playerId: number
    ): Promise<ReturnPlayerDto> {
        const cleanedData = cleanData(playerData);
        
        const player = await this.prisma.player.update({
            where: {
                id: playerId,
            },
            data: cleanedData,
        });

        if (!player) {
            throw new NotFoundException(`Player with ID ${playerId} not found.`);
        }

        return PlayerMapper.toReturnPlayerDto(player);
    }

    async updateProfilePicture(
        profilePicture: string, 
        playerId: number
    ): Promise<ReturnPlayerDto> {
        const player = await this.prisma.player.update({
            where: {
                id: playerId,
            },
            data: {
                profilePicture: profilePicture,
            },
        });

        if (!player) {
            throw new NotFoundException(`Player with ID ${playerId} not found.`);
        }

        return PlayerMapper.toReturnPlayerDto(player);
    }

    async joinTeam(
        playerId: number, 
        teamId: number
    ): Promise<ReturnPlayerDto> {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
        });
        
        if (!team) {
            throw new NotFoundException(`Team with ID ${teamId} not found.`);
        }
        
        const updatedPlayer = await this.prisma.player.update({
            where: {
                id: playerId,
            },
            data: {
                teamId: teamId,
            },
        });


        return PlayerMapper.toReturnPlayerDto(updatedPlayer);
    }

    async exitTeam(
        playerId: number,
        teamId: number
    ): Promise<ReturnPlayerDto> {
        const player = await this.prisma.player.update({
            where: {
                id: playerId,
                teamId: teamId,
            },
            data: {
                teamId: null,
            },
        });

        if (!player) {
            throw new NotFoundException(`Player with ID ${playerId} not found.`);
        }

        return PlayerMapper.toReturnPlayerDto(player);
    }

    async showTeammates(
        teamId: number
    ): Promise<ReturnPlayerDto[]> {
        if (teamId == undefined) {
            throw new Error('You must provide teamId');
        }

        const teammates = await this.prisma.player.findMany({
            where: {
                teamId: teamId,
            },
        });

        return teammates.map(PlayerMapper.toReturnPlayerDto);
    }

    async showTeamSchedule() {
        // TODO: Implement this method
    }
}