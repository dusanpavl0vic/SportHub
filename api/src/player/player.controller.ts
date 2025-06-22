import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, forwardRef, Get, Inject, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PLAYER_PROFILEIMAGE_STORAGE_PATH } from 'src/config/constants';
import { MembershipService } from 'src/membership/membership.service';
import { ReturnPlayerDto, UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@UseInterceptors(ClassSerializerInterceptor)

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => MembershipService))
    private readonly membershipService: MembershipService,
  ) { }


  @Get(':id/memberships')
  async getPlayerMemberships(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const player = await this.playerService.findByIdWithMemberships(id);
    if (!player) {
      throw new BadRequestException(`Player with ID ${id} not found`);
    }
    return player.memberships;
  }



  // @Delete(':id')
  // async deletePlayer(@Param('id', ParseIntPipe) id: number): Promise<Player> {
  //   const player = await this.playerService.findById(id);

  //   if (player.team) {
  //     await this.teamService.removePlayerFromTeam(player.team.id, player.id);
  //   }

  //   return this.playerService.removePlayer(id);
  // }

  @Post(':playerId/uploadImage')
  @ApiOperation({ summary: 'Upload profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    schema: {
      type: 'object',
      properties: {
        profileImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Player successfully upload profile image' })
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const playerId = req.params.playerId;
          const playerFolder = join(process.cwd(), PLAYER_PROFILEIMAGE_STORAGE_PATH, playerId);

          if (!existsSync(playerFolder)) {
            mkdirSync(playerFolder, { recursive: true });
          }

          console.log(`Player folder created at: ${playerFolder}`);

          cb(null, playerFolder);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const playerId = req.params.playerId;
          const playerFolder = join(process.cwd(), PLAYER_PROFILEIMAGE_STORAGE_PATH, playerId);

          if (existsSync(playerFolder)) {
            const files = readdirSync(playerFolder);
            for (const f of files) {
              if (f.startsWith('profile_image')) {
                unlinkSync(join(playerFolder, f));
              }
            }
          }

          cb(null, `profile_image${ext}`);
        },
      }),
    }),
  )
  async uploadPlayerImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    if (!file) throw new BadRequestException('Player image is required');
    const player = await this.playerService.uploadImage(
      playerId,
      file.filename,
    );
    return player;
  }

  @Post('request/:playerId/:teamId')
  @ApiOperation({ summary: 'Player requests to join a team' })
  @ApiResponse({ status: 201, description: 'Membership created with pending status' })
  async requestToJoinTeam(
    @Param('playerId', ParseIntPipe) playerId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    console.log(`Player ${playerId} requesting to join team ${teamId}`);
    return this.membershipService.requestToJoinTeam(playerId, teamId);
  }


  @Post('leave/:teamId/:playerId')
  @ApiOperation({ summary: 'Player leaves a team' })
  @ApiResponse({ status: 200, description: 'Player marked as left the team' })
  async leaveTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return this.membershipService.leftPlayer(teamId, playerId);
  }

  @Patch(':id')
  async updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<ReturnPlayerDto> {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  async removePlayer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Player> {
    return this.playerService.removePlayer(id);
  }
}
