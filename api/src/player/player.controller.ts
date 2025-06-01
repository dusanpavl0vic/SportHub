import { Body, Controller, Get, NotFoundException, Put, UseGuards, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator/index';
import { Player } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from 'src/dtos/player.dto';
import { PlayerDto, PlayerResponseDto } from 'src/dtos/player/player.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('player')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlayerController {
    
    constructor( private playerService: PlayerService ) {}
    
    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Get('me')
    getMe(@GetUser('') player: PlayerDto): PlayerResponseDto {
        return plainToInstance(PlayerResponseDto, {
            ...player,
            profilePicture: player.profilePicture ?? undefined,
            birthDate: player.birthDate ?? undefined,
            phoneNumber: player.phoneNumber ?? undefined,
            team: player.team 
              ? { id: player.team.id, name: player.team.teamName } 
              : null,
          });
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Get('playerTeam')
    async getTeam(@GetUser() player: Player) {

        return this.playerService.getTeam(player);
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Get('playerStatus')
    async getStatus(@GetUser() player: Player) {
        if (!player.status) {
            throw new NotFoundException('You are not in a team.');
        }

        return player.teamId;
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Put('updatePlayer')
    async updatePlayer(@GetUser() player: Player, @Body() data: UpdatePlayerDto) {
        return this.playerService.updatePlayer(data, player.id);
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Put('updateProfilePicture')
    async updatePlayerPhoto(@GetUser() player: Player, @Body() profilePicture: string,) {
        return this.playerService.updateProfilePicture(profilePicture, player.id);
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Put('joinTeam')
    async joinTeam(@GetUser() player: Player, @Body() body: { teamId: number }) {
        
        const teamId = Number(body.teamId);

        if (isNaN(teamId)) {
            throw new BadRequestException('Invalid teamId. It must be a number.');
        }

        return this.playerService.joinTeam(player.id, teamId);
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Put('exitTeam')
    async exitTeam(@GetUser() player: Player, @Body() teamId: number) {
        

        if (!player.teamId) {
            throw new NotFoundException('You are not in a team.');
        }
        

        return this.playerService.exitTeam(player.id, teamId);
    }

    @Roles(["PLAYER"])
    @HttpCode(HttpStatus.OK)
    @Get('playerTeammates')
    async getTeammates(@GetUser() player: Player) {
        if (!player.teamId) {
            throw new NotFoundException('You are not in a team.');
        }

        return this.playerService.showTeammates(player.teamId);
    }

}
