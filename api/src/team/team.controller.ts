import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, forwardRef, Get, HttpCode, Inject, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CreateAnnouncementDto } from 'src/announcement/dto/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/announcement/dto/update-announcement.dto';
import { TEAM_PROFILEIMAGE_STORAGE_PATH } from 'src/config/constants';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { UpdateGroupDto } from 'src/group/dto/update-group.dto';
import { MembershipService } from 'src/membership/membership.service';
import { ChangePasswordDto } from 'src/player/dto/change-password.dto';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { TeamCardDto } from './dto/card-team.dto';
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

  // @Get()
  // findAll() {
  //   return this.teamService.findAll();
  // }



  @Post(':teamId/accept/:playerId')
  async acceptPlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    console.log(typeof teamId, typeof playerId);
    return this.membershipService.acceptPlayer(teamId, playerId);
  }

  @Delete(':teamId/refuse/:playerId')
  @HttpCode(204)
  async refusePlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.refusePlayer(teamId, playerId);
  }

  @Delete(':teamId/left/:playerId')
  @HttpCode(204)
  async leftPlayer(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return await this.membershipService.leftPlayer(teamId, playerId);
  }

  @Get(':teamId/active-memberships')
  @HttpCode(200)
  async getTeamActiveMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersActive(teamId);
  }

  @Get(':teamId/inactive-memberships')
  @HttpCode(200)
  async getTeamInactiveMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersInactive(teamId);
  }

  @Get(':teamId/pending-memberships')
  @HttpCode(200)
  async getTeamPendingMemberships(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<any> {
    return await this.teamService.findAllTeamPlayersPending(teamId);
  }



  @Post('filter')
  async getFilteredTeams(
    @Body() filterDto: FilterTeamDto,
  ): Promise<{
    data: TeamCardDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    console.log('Filter DTO:', filterDto);
    return this.teamService.getFilteredTeams(filterDto);
  }


  @Delete(':id')
  async removePlayer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Team> {
    return this.teamService.removeTeam(id);
  }

  @Post(':teamId/uploadImage')
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
          const teamId = req.params.teamId;
          const teamFolder = join(process.cwd(), TEAM_PROFILEIMAGE_STORAGE_PATH, teamId);

          if (!existsSync(teamFolder)) {
            mkdirSync(teamFolder, { recursive: true });
          }

          console.log(`Player folder created at: ${teamFolder}`);

          cb(null, teamFolder);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const teamId = req.params.playerId;
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
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<UpdateTeamProfileImageDto> {
    if (!file) throw new BadRequestException('Team image is required');
    const team = await this.teamService.uploadImage(
      teamId,
      file.filename,
    );
    return team;
  }

  @Patch(':id')
  async updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<ReturnTeamDto> {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @Patch(':id/password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() passwords: ChangePasswordDto,

  ): Promise<{ message: string }> {
    return await this.teamService.changePassword(id, passwords);
  }


  @Post(':id/announcement')
  async uploadAnnouncement(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAnnouncementDto,
  ) {
    console.log("ovde 1");
    return await this.teamService.uploadAnnouncement(id, dto);
  }

  @Get(':id/full')
  async returnTeamFull(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.teamService.findByIdFull(id);
  }

  @Delete(':id/announcement/:annId')
  async deleteAnnouncement(
    @Param('id', ParseIntPipe) id: number,
    @Param('annId', ParseIntPipe) annId: number,
  ) {
    console.log(id, annId);
    return await this.teamService.deleteAnnouncement(id, annId);
  }

  @Get(':id/announcement/:page/:limit')
  async allAnouncements(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', ParseIntPipe) page: number,
    @Param('limit', ParseIntPipe) limit: number,
  ) {
    return await this.teamService.allAnouncements(id, { page, limit });
  }

  @Patch(':id/announcement/:annId')
  async updateAnouncements(
    @Param('id', ParseIntPipe) id: number,
    @Param('annId', ParseIntPipe) annId: number,
    @Body() dto: UpdateAnnouncementDto
  ) {
    return await this.teamService.updateAnouncements(id, annId, dto);
  }

  @Post(':id/group')
  async createGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateGroupDto,
  ) {
    return await this.teamService.createGroup(id, dto);
  }

  @Get(':id/group')
  async allGroups(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.teamService.allGroups(id);
  }

  @Patch(':id/group/:groupId')
  async updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: UpdateGroupDto
  ) {
    return await this.teamService.updateGroup(id, groupId, dto);
  }

  @Delete(':id/group/:groupId')
  async deleteGroup(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    console.log(id, groupId);
    return await this.teamService.deleteGroup(id, groupId);
  }

  @Post(':id/group/:groupId/schedule')
  async createSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateScheduleDto,
  ) {
    return await this.teamService.createSchedule(id, groupId, dto);
  }

  @Patch(':id/group/:groupId/schedule/:scheduleId')
  async updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() dto: UpdateScheduleDto
  ) {
    return await this.teamService.updateSchedule(id, groupId, scheduleId, dto);
  }

  @Delete(':id/group/:groupId/schedule/:scheduleId')
  async deleteSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
  ) {
    console.log(id, groupId);
    return await this.teamService.deleteSchedule(id, groupId, scheduleId);
  }
}
