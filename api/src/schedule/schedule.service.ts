import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateScheduleWithGroupDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {

  constructor(
    @Inject("SCHEDULE_REPOSITORY") private repo: Repository<Schedule>,
  ) {

  }
  async create(
    createScheduleDto: CreateScheduleWithGroupDto,
  ) {
    const schedule = await this.repo.create(createScheduleDto);

    return await this.repo.save(schedule);
  }

  async findOne(
    id: number
  ) {
    const schedule = await this.repo.findOne({
      where: {
        id: id
      }
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto
  ) {
    const schedule = await this.findOne(id);

    Object.assign(schedule, updateScheduleDto);

    console.log("updateSchedule 3");

    return await this.repo.save(schedule);
  }

  async remove(
    id: number
  ) {
    const schedule = await this.findOne(id);

    await this.repo.remove(schedule);

    return {
      scheduleId: id
    }
  }
}
