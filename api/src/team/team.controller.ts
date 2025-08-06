import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, forwardRef, Get, HttpCode, Inject, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CreateAnnouncementDto } from 'src/announcement/dto/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/announcement/dto/update-announcement.dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { TEAM_PROFILEIMAGE_STORAGE_PATH } from 'src/config/constants';
import { Role } from 'src/enum/role.enum';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { UpdateGroupDto } from 'src/group/dto/update-group.dto';
import { MembershipService } from 'src/membership/membership.service';
import { ChangePasswordDto } from 'src/player/dto/change-password.dto';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { TeamCardSportDto } from './dto/card-team.dto';
import { FilterTeamDto } from './dto/filter.dto';
import { ReturnTeamDto, UpdateTeamDto, UpdateTeamProfileImageDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    @Inject(forwardRef(() => MembershipService))
    private readonly membershipService: MembershipService,
  ) { }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Get('me')
  getMe(
    @GetUser('id') teamId: number
  ) {
    return this.teamService.findByIdWithOutUser(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Post('me/accept/:playerId')
  async acceptPlayer(
    @GetUser('id') teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    console.log(typeof teamId, typeof playerId);
    return this.membershipService.acceptPlayer(teamId, playerId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/refuse/:playerId')
  @HttpCode(204)
  async refusePlayer(
    @GetUser('id') teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.refusePlayer(teamId, playerId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/left/:playerId')
  @HttpCode(204)
  async leftPlayer(
    @GetUser('id') teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.leftPlayer(teamId, playerId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Get('me/active-memberships')
  @HttpCode(200)
  async getTeamActiveMemberships(
    @GetUser('id') teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersActive(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Get('me/inactive-memberships')
  @HttpCode(200)
  async getTeamInactiveMemberships(
    @GetUser('id') teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersInactive(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Get('me/pending-memberships')
  @HttpCode(200)
  async getTeamPendingMemberships(
    @GetUser('id') teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersPending(teamId);
  }



  @Post()
  async getFilteredTeams(
    @Body() filterDto: FilterTeamDto
  ): Promise<{
    data: TeamCardSportDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.teamService.getFilteredTeams(filterDto);
  }


  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/player')
  async removePlayer(
    @GetUser('id') teamId: number,
  ): Promise<Team> {
    return this.teamService.removeTeam(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Post('me/uploadImage')
  @ApiOperation({ summary: 'Upload team image' })
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
  @ApiResponse({ status: 201, description: 'Team successfully upload profile image' })
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: (req, file, cb) => {

          const teamId = JSON.parse(JSON.stringify(req.user)).id.toString();
          console.log(teamId + "hvala kurcu");
          const teamFolder = join(process.cwd(), TEAM_PROFILEIMAGE_STORAGE_PATH, teamId);

          if (!existsSync(teamFolder)) {
            mkdirSync(teamFolder, { recursive: true });
          }

          console.log(`Player folder created at: ${teamFolder}`);

          cb(null, teamFolder);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const teamId = JSON.parse(JSON.stringify(req.user)).id.toString();

          const teamFolder = join(process.cwd(), TEAM_PROFILEIMAGE_STORAGE_PATH, teamId);

          if (existsSync(teamFolder)) {
            const files = readdirSync(teamFolder);
            for (const f of files) {
              if (f.startsWith('team_logo')) {
                unlinkSync(join(teamFolder, f));
              }
            }
          }

          cb(null, `profile_image${ext}`);
        },
      }),
    }),
  )
  async uploadTeamImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') teamId: number,
  ): Promise<UpdateTeamProfileImageDto> {
    if (!file)
      throw new BadRequestException('Team image is required');

    const team = await this.teamService.uploadImage(
      teamId,
      file.filename,
    );
    return team;
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Patch('me')
  async updateTeam(
    @GetUser('id') teamId: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<ReturnTeamDto> {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Patch('me/password')
  async changePassword(
    @GetUser('id') teamId: number,
    @Body() passwords: ChangePasswordDto,

  ): Promise<{ message: string }> {
    return await this.teamService.changePassword(teamId, passwords);
  }


  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Post('me/announcement')
  async uploadAnnouncement(
    @GetUser('id') teamId: number,
    @Body() dto: CreateAnnouncementDto,
  ) {
    console.log("ovde 1");
    return await this.teamService.uploadAnnouncement(teamId, dto);
  }

  @Get(':id')
  async returnTeamFull(
    @Param('id') teamId: number,
  ) {
    return this.teamService.findByIdFull(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/announcement/:annId')
  async deleteAnnouncement(
    @GetUser('id') teamId: number,
    @Param('annId', ParseIntPipe) annId: number,
  ) {
    return await this.teamService.deleteAnnouncement(teamId, annId);
  }

  @Get(':id/announcement/:page/:limit')
  async allAnouncements(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', ParseIntPipe) page: number,
    @Param('limit', ParseIntPipe) limit: number,
  ) {
    return await this.teamService.allAnouncements(id, { page, limit });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Patch('me/announcement/:annId')
  async updateAnouncements(
    @GetUser('id') teamId: number,
    @Param('annId', ParseIntPipe) annId: number,
    @Body() dto: UpdateAnnouncementDto
  ) {
    return await this.teamService.updateAnouncements(teamId, annId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Post('me/group')
  async createGroup(
    @GetUser('id') teamId: number,
    @Body() dto: CreateGroupDto,
  ) {
    return await this.teamService.createGroup(teamId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Get('me/group')
  async allGroups(
    @GetUser('id') teamId: number,
  ) {
    return await this.teamService.allGroups(teamId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Patch('me/group/:groupId')
  async updateGroup(
    @GetUser('id') teamId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: UpdateGroupDto
  ) {
    return await this.teamService.updateGroup(teamId, groupId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/group/:groupId')
  async deleteGroup(
    @GetUser('id') teamId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.teamService.deleteGroup(teamId, groupId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Post('me/group/:groupId/schedule')
  async createSchedule(
    @GetUser('id') teamId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateScheduleDto,
  ) {
    return await this.teamService.createSchedule(teamId, groupId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Patch('me/group/:groupId/schedule/:scheduleId')
  async updateSchedule(
    @GetUser('id') teamId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() dto: UpdateScheduleDto
  ) {
    return await this.teamService.updateSchedule(teamId, groupId, scheduleId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.TEAM])
  @Delete('me/group/:groupId/schedule/:scheduleId')
  async deleteSchedule(
    @GetUser('id') teamId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
  ) {
    return await this.teamService.deleteSchedule(teamId, groupId, scheduleId);
  }

  @Get('cities')
  async getAllCities(): Promise<string[]> {
    return await this.teamService.getAllCites();
  }
}
