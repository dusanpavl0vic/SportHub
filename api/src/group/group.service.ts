import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGroupWithTeamDto, ReturnGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {

  constructor(
    @Inject('GROUP_REPOSITORY') private repo: Repository<Group>,
  ) { }

  async create(
    dto: CreateGroupWithTeamDto
  ): Promise<ReturnGroupDto> {
    const group = await this.repo.create(dto);

    const save = await this.repo.save(group);

    return {
      id: save.id,
      name: save.name,
      teamId: save.team.id,
      schedules: save.schedules
    };
  }

  async findOne(
    id: number
  ) {
    const group = await this.repo.findOne({
      where: { id: id },
      relations: ['schedules']
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async update(
    id: number,
    updateGroupDto: UpdateGroupDto
  ) {
    const group = await this.findOne(id);

    Object.assign(group, updateGroupDto);

    return await this.repo.save(group);
  }

  async remove(
    id: number
  ) {
    const group = await this.findOne(id);

    await this.repo.remove(group);

    return {
      groupId: id
    }
  }
}
