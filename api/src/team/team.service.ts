import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { CreateAnnouncementDto } from 'src/announcement/dto/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/announcement/dto/update-announcement.dto';
import { TEAM_PROFILEIMAGE_BASE_URL } from 'src/config/constants';
import { PlayerStatus } from 'src/enum/player_status.enum';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { UpdateGroupDto } from 'src/group/dto/update-group.dto';
import { GroupService } from 'src/group/group.service';
import { Membership } from 'src/membership/entities/membership.entity';
import { ChangePasswordDto } from 'src/player/dto/change-password.dto';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TeamCardSportDto } from './dto/card-team.dto';
import { RegisterTeamDto } from './dto/create-team.dto';
import { FilterTeamDto, Pagination } from './dto/filter.dto';
import { ReturnTeamDto, UpdateTeamDto, UpdateTeamProfileImageDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { FilterByCityStrategy } from './filters/filter-by-city.filters';
import { FilterBySportStrategy } from './filters/filter-by-sport.filters';
import { SortByNameStrategy } from './filters/sort-by-name.filter';

@Injectable()
export class TeamService {

  constructor(
    @Inject('TEAM_REPOSITORY') private repo: Repository<Team>,
    private userService: UserService,
    private annService: AnnouncementService,
    private groupService: GroupService,
    private scheduleService: ScheduleService,
  ) { }

  // async create(createTeamDto: RegisterTeamDto) {
  //   const team = this.repo.create(createTeamDto);
  //   return this.repo.save(team);
  // }

  async create(
    createTeamDto: RegisterTeamDto,
  ) {

    const team = await this.repo.create(createTeamDto);

    return this.repo.save(team);
  }

  async findByUserId(
    userId: number,

  ): Promise<number> {

    const team = await this.repo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!team) {
      throw new NotFoundException(`Team with user ID ${userId} not found`);
    }
    return team.id;
  }

  async findById(
    id: number,
  ) {

    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'sport'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findByIdWithOutUser(
    id: number,
  ) {

    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['sport'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findByIdWithAnn(
    id: number,
  ) {

    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'sport', 'announcements'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findByIdWithGroups(
    id: number,
  ) {

    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'sport', 'groups', 'groups.schedules'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findByIdFull(
    id: number,
  ) {
    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['sport', 'announcements', 'groups',],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async findByIdWithMemberships(
    id: number,
  ) {

    const team = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'memberships', 'sport'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async findAll(
  ) {
    return this.repo.find({
      relations: ['user', 'sport'],
    });
  }

  async findAllWithMemberships(

  ) {

    return this.repo.find({
      relations: ['user', 'sport', 'memberships'],
    });
  }

  async addMembership(
    teamId: number,
    membership: Membership,

  ): Promise<Team> {

    const team = await this.findByIdWithMemberships(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    team.memberships.push(membership);
    return this.repo.save(team);
  }

  async incrementPlayerCount(
    teamId: number,

  ): Promise<void> {

    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    team.numberOfPlayers += 1;
    await this.repo.update(team.id, {
      numberOfPlayers: team.numberOfPlayers,
    });
  }

  async decrementPlayerCount(
    teamId: number,

  ): Promise<void> {

    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    team.numberOfPlayers -= 1;
    await this.repo.update(team.id, {
      numberOfPlayers: team.numberOfPlayers,
    });
  }

  async findAllTeamPlayersActive(
    teamId: number,
  ): Promise<Membership[]> {
    const team = await this.findByIdWithMemberships(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    return team.memberships.filter(membership => membership.status === PlayerStatus.IN_TEAM);
  }

  async findAllTeamPlayersInactive(
    teamId: number,
  ): Promise<Membership[]> {
    const team = await this.findByIdWithMemberships(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    return team.memberships.filter(membership => membership.status === PlayerStatus.LEFT);
  }

  async findAllTeamPlayersPending(
    teamId: number,
  ): Promise<Membership[]> {
    const team = await this.findByIdWithMemberships(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    return team.memberships.filter(membership => membership.status === PlayerStatus.PENDING);
  }

  async getFilteredTeams(
    filterDto: FilterTeamDto
  ): Promise<{
    data: TeamCardSportDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const query = this.repo.createQueryBuilder('team')
      .leftJoinAndSelect('team.sport', 'sport');

    // const filterDto: FilterTeamDto = {
    //   city,
    //   sportId,
    //   sort,
    //   page: page,
    //   limit: limit,
    // };

    const strategies = [
      new FilterBySportStrategy(),
      new FilterByCityStrategy(),
      new SortByNameStrategy(),
    ];

    for (const strategy of strategies) {
      strategy.apply(query, filterDto);
    }


    const pageR = filterDto.page ?? 1;
    const limitR = filterDto.limit ?? 10;

    query.skip((pageR - 1) * limitR).take(limitR);

    const [teams, total] = await query.getManyAndCount();
    // console.log('First team:', teams);

    return {
      data:
        (await teams).map(team => ({
          id: team.id,
          name: team.name,
          profilePicture: team.profilePicture,
          city: team.city,
          numberOfPlayers: team.numberOfPlayers,
          sport: team.sport
        })),
      total,
      page: pageR,
      limit: limitR
    }
  }

  async removeTeam(
    teamId: number,
  ): Promise<Team> {
    const team = await this.repo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.user', 'user')
      .where('team.id = :id', { id: teamId })
      .getOne();

    if (!team) {
      throw new NotFoundException('Player not found');
    }

    await this.repo.remove(team);
    await this.userService.remove(team.user.id);

    return team;


  }

  async uploadImage(
    teamId: number,
    imageName: string,
  ): Promise<UpdateTeamProfileImageDto> {
    const team = await this.findById(teamId);
    if (!team)
      throw new NotFoundException('Player not found');
    await this.repo.update(team.id, { profilePicture: TEAM_PROFILEIMAGE_BASE_URL + teamId + "/" + imageName });
    console.log("Team profile picture updated:", team.profilePicture);
    return {
      id: team.id,
      profileImage: TEAM_PROFILEIMAGE_BASE_URL + teamId + "/" + imageName,
    };
  }

  async updateTeam(
    teamId: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<ReturnTeamDto> {
    const team = await this.findById(teamId);
    if (!team)
      throw new NotFoundException('Team not found');

    Object.assign(team, updateTeamDto);

    const update = await this.repo.save(team);

    return {
      id: update.id,
      name: update.name,
      city: update.city,
    }
  }

  async changePassword(
    teamId: number,
    passwords: ChangePasswordDto
  ): Promise<{ message: string }> {
    const team = await this.findById(teamId);
    if (!team)
      throw new NotFoundException('Team not found');


    if (!this.userService.changePassword(team.user, passwords)) {
      throw new BadRequestException({ message: 'Failed to change password' });
    }

    return { message: 'Password changed successfully' };
  }


  async uploadAnnouncement(
    teamId: number,
    createAnnouncementDto: CreateAnnouncementDto
  ) {
    console.log("ovde 2");

    const team = await this.findById(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }
    console.log("ovde 3");


    return await this.annService.create({ team, ...createAnnouncementDto });
  }

  async deleteAnnouncement(
    teamId: number,
    annId: number
  ) {
    const team = await this.findByIdWithAnn(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (!team.announcements.some(ann => ann.id == annId)) {
      throw new NotFoundException('Team dont have this announcement');
    }

    return await this.annService.remove(annId);
  }

  async allAnouncements(
    teamId: number,
    pag: Pagination
  ) {
    const team = await this.findById(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return await this.annService.allAnnouncements(teamId, pag);
  }

  async updateAnouncements(
    teamId: number,
    annId: number,
    dto: UpdateAnnouncementDto
  ) {
    const team = await this.findByIdWithAnn(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (!team.announcements.some(ann => ann.id == annId)) {
      throw new NotFoundException('Team dont have this announcement');
    }

    return await this.annService.update(annId, dto);
  }


  async createGroup(
    teamId: number,
    dto: CreateGroupDto
  ) {
    const team = await this.findByIdWithGroups(teamId);

    return await this.groupService.create({ team, ...dto });
  }

  async updateGroup(
    teamId: number,
    groupId: number,
    dto: UpdateGroupDto
  ) {
    const team = await this.findByIdWithGroups(teamId);

    if (!team.groups.some(group => group.id == groupId)) {
      throw new NotFoundException('Team dont have this group');
    }

    return await this.groupService.update(groupId, dto);
  }

  async deleteGroup(
    teamId: number,
    groupId: number
  ) {
    const team = await this.findByIdWithGroups(teamId);

    if (!team.groups.some(group => group.id == groupId)) {
      throw new NotFoundException('Team dont have this group');
    }

    return await this.groupService.remove(groupId);
  }

  async allGroups(
    teamId: number
  ) {
    const team = await this.findByIdWithGroups(teamId);

    return team.groups;
  }

  async createSchedule(
    teamId: number,
    groupId: number,
    dto: CreateScheduleDto
  ) {
    const team = await this.findByIdWithGroups(teamId);

    if (!team.groups.some(group => group.id == groupId)) {
      throw new NotFoundException('Team dont have this group');
    }

    const group = await this.groupService.findOne(groupId);

    const schedule = await this.scheduleService.create({ group, ...dto })

    return schedule;
  }

  async updateSchedule(
    teamId: number,
    groupId: number,
    scheduleId: number,
    dto: UpdateScheduleDto
  ) {
    const team = await this.findByIdWithGroups(teamId);

    if (!team.groups.some(group => group.id == groupId)) {
      throw new NotFoundException('Team dont have this group');
    }

    console.log("updateSchedule 1");
    const group = await this.groupService.findOne(groupId);

    if (!group.schedules.some(schedule => schedule.id == scheduleId)) {
      throw new NotFoundException('Group dont have this schedule');
    }
    console.log("updateSchedule 2");

    return await this.scheduleService.update(scheduleId, dto);

  }

  async deleteSchedule(
    teamId: number,
    groupId: number,
    scheduleId: number
  ) {
    const team = await this.findByIdWithGroups(teamId);

    if (!team.groups.some(group => group.id == groupId)) {
      throw new NotFoundException('Team dont have this group');
    }

    const group = await this.groupService.findOne(groupId);

    if (!group.schedules.some(schedule => schedule.id == scheduleId)) {
      throw new NotFoundException('Group dont have this schedule');
    }

    return await this.scheduleService.remove(scheduleId);
  }

  async getAllCites(): Promise<string[]> {
    const rawCities = await this.repo
      .createQueryBuilder('team')
      .select('team.city', 'city')
      .where('team.city IS NOT NULL')
      .getRawMany();

    return rawCities
      .map(c => c.city)
      .filter((city, index, self) => self.indexOf(city) === index);
  }

}
