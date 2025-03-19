import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PlayerDto, ReturnPlayerDto, UpdatePlayerDto } from 'src/dto/player.dto';
import { PlayerMapper } from 'src/mapper/mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { cleanData } from 'src/util/clean-data.util';

@Injectable()
export class PlayerService {

    constructor( private prisma: PrismaService ) {}

    async getPlayerById(
        playerId: number
    ): Promise<ReturnPlayerDto> {
        try {
            const player = await this.prisma.player.findUniqueOrThrow({
                where: {
                    id: playerId,
                },
            });

            return PlayerMapper.toReturnPlayerDto(player);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Player with ID ${playerId} not found.`);
            }
            throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
        }
    }

    async getPlayerByIdArray(playerIdArray: number[]){
        try {
            const players = await this.prisma.player.findMany({
                where: {
                    id: { in: playerIdArray }
                } 
            });

            return players.map(PlayerMapper.toReturnPlayerDto);

        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch: ${error.message}`);
        }
    }
    
    async updatePlayer(
        playerData: UpdatePlayerDto,
        playerId: number
    ): Promise<ReturnPlayerDto> {
        try {
            const cleanedData = cleanData(playerData);
            
            const player = await this.prisma.player.update({
                where: {
                    id: playerId,
                },
                data: cleanedData,
            });

            return PlayerMapper.toReturnPlayerDto(player);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Player with ID ${playerId} not found.`);
            }
            throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
        }
    }

    async updateProfilePicture(
        profilePicture: string,
        playerId: number
    ): Promise<ReturnPlayerDto> {
        try {
            const player = await this.prisma.player.update({
                where: {
                    id: playerId,
                },
                data: {
                    profilePicture: profilePicture,
                },
            });

            return PlayerMapper.toReturnPlayerDto(player);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Player with ID ${playerId} not found.`);
            }
            throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
        }
    }

    async joinTeam(
        playerId: number,
        teamId: number
    ): Promise<ReturnPlayerDto> {
        try {
            
            const teamExists = await this.prisma.team.findUnique({
                where: { id: teamId },
            });
            
            if (!teamExists) {
                throw new NotFoundException(`Team with ID ${teamId} not found.`);
            }

            const player = await this.prisma.player.update({
                where: {
                    id: playerId,
                },
                data: {
                    teamId: teamId,
                },
            }); 

            return PlayerMapper.toReturnPlayerDto(player);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Player with ID ${playerId} not found.`);
            }
            throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
        }
    }

    async exitTeam(
        playerId: number,
    ): Promise<ReturnPlayerDto> {
        try {

            const player = await this.prisma.player.update({
                where: {
                    id: playerId,
                },
                data: {
                    teamId: null,
                },
            }); 

            return PlayerMapper.toReturnPlayerDto(player);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Player with ID ${playerId} not found.`);
            }
            throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
        }
    }

    async showTeamSchedule(){
        //TODO: Implement this method
    }

    async showTeammates(){
        
    }

}


// try {
            

// } catch (error) {
//     if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
//         throw new NotFoundException(`Player with ID ${playerId} not found.`);
//     }
//     throw new InternalServerErrorException(`Failed to join team: ${error.message}`);
// }