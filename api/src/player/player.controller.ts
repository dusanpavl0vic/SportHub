import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { PLAYER_PROFILEIMAGE_STORAGE_PATH } from 'src/config/constants';
import { Role } from 'src/enum/role.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PlayerDto } from './dto/create-player.dto';
import { ReturnPlayerDto, UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@UseInterceptors(ClassSerializerInterceptor)

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
  ) { }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Get('me')
  async getPlayer(
    @GetUser('id') playerId: number,
  ): Promise<PlayerDto> {
    const player = await this.playerService.findByIdWithOutUser(playerId);
    if (!player) {
      throw new BadRequestException(`Player with ID ${playerId} not found`);
    }
    console.log("Get me", player);
    return player;
  }


  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Get('me/memberships')
  async getPlayerMemberships(
    @GetUser('id') playerId: number,
  ): Promise<any> {
    const player = await this.playerService.findByIdWithMemberships(playerId);
    if (!player) {
      throw new BadRequestException(`Player with ID ${playerId} not found`);
    }
    return player.memberships;
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Post('me/uploadImage')
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
          const playerId = JSON.parse(JSON.stringify(req.user)).id.toString();
          const playerFolder = join(process.cwd(), PLAYER_PROFILEIMAGE_STORAGE_PATH, playerId);

          if (!existsSync(playerFolder)) {
            mkdirSync(playerFolder, { recursive: true });
          }

          console.log(`Player folder created at: ${playerFolder}`);

          cb(null, playerFolder);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const playerId = JSON.parse(JSON.stringify(req.user)).id.toString();
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
    @GetUser('id') playerId: number,
  ) {
    if (!file) throw new BadRequestException('Player image is required');
    const player = await this.playerService.uploadImage(
      playerId,
      file.filename,
    );
    return player;
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Post('me/request/team/:teamId')
  async requestToJoinTeam(
    @GetUser('id') playerId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    //console.log(`Player ${playerId} requesting to join team ${teamId}`);
    return this.playerService.requestToJoinTeam(playerId, teamId);
  }


  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Post('me/leave/team/:teamId/')
  async leaveTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @GetUser('id') playerId: number,
  ) {
    return this.playerService.leaveTeam(teamId, playerId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Patch(':id')
  async updatePlayer(
    @GetUser('id') playerId: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<ReturnPlayerDto> {
    return this.playerService.updatePlayer(playerId, updatePlayerDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Delete(':id')
  async removePlayer(
    @GetUser('id') playerId: number,
  ): Promise<Player> {
    return this.playerService.removePlayer(playerId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Patch(':id/password')
  async changePassword(
    @GetUser('id') playerId: number,
    @Body() passwords: ChangePasswordDto,

  ): Promise<{ message: string }> {
    return await this.playerService.changePassword(playerId, passwords);
  }

  @Get('all')
  async allPlayers(
  ): Promise<{ players: Player[]; count: number }> {
    return await this.playerService.findAll();
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.PLAYER])
  @Get(':playerId/:teamId/group')
  async allGroups(
    @GetUser('id') playerId: number,
  ) {
    return this.playerService.allGroups(playerId)
  }

  @Get(':playerId/profile')
  async playerProfile(
    @Param('playerId') playerId: number,
  ) {
    return this.playerService.returnPlayerProfile(playerId);
  }


  // @Get(':playerId/team/:teamId/teammates')
  // async showTeammates(
  //   @Param('playerId') playerId: number,
  //   @Param('teamId') teamId: number,
  // ) {
  //   return this.playerService.showTeammates(playerId, teamId);
  // }
}
