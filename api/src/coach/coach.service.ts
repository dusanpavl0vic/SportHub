import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TeamService } from 'src/team/team.service';
import { Repository } from 'typeorm';
import { RegisterCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachService {
  constructor(
    @Inject('COACH_REPOSITORY') private repo: Repository<Coach>,
    private teamService: TeamService,
  ) { }

  async create(createCoachDto: RegisterCoachDto) {

    const team = await this.teamService.findById(createCoachDto.teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const coach = this.repo.create({
      email: createCoachDto.email,
      password: createCoachDto.password,
      firstname: createCoachDto.firstname,
      lastname: createCoachDto.lastname,
      city: createCoachDto.city,
      team: team,
    });

    return this.repo.save(coach);
  }

  async findById(id: number): Promise<Coach> {
    const coach = await this.repo.findOne({
      where: { id },
    });

    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }

    return coach;
  }

  findAll() {
    return `This action returns all coach`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coach`;
  }

  update(id: number, updateCoachDto: UpdateCoachDto) {
    return `This action updates a #${id} coach`;
  }

  remove(id: number) {
    return `This action removes a #${id} coach`;
  }
}
