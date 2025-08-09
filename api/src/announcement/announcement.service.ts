import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Pagination } from 'src/team/dto/filter.dto';
import { Repository } from 'typeorm';
import { CreateAnnouncementWithTeamDto, ReturnAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @Inject('ANNOUNCEMENT_REPOSITORY') private repo: Repository<Announcement>,
  ) { }

  async create(
    createDto: CreateAnnouncementWithTeamDto
  ) {
    console.log("ovde 4");

    const ann = await this.repo.create(createDto);
    console.log("ovde 5");


    return await this.repo.save(ann);
  }

  async remove(
    id: number
  ) {
    const ann = await this.repo.findOne({
      where: { id: id }
    });

    if (!ann) {
      throw new NotFoundException('Announcement not found');
    }

    const deleteAnn = await this.repo.remove(ann);

    return {
      announcementId: id
    }
  }

  async findOne(
    id: number
  ): Promise<ReturnAnnouncementDto> {
    const ann = await this.repo.findOne({
      where: { id: id }
    });

    if (!ann) {
      throw new NotFoundException('Announcement not found');
    }

    return {
      id: ann.id,
      title: ann.title,
      description: ann.description,
      date: ann.date
    }
  }

  async update(
    id: number,
    dto: UpdateAnnouncementDto
  ) {
    const ann = await this.findOne(id);

    if (!ann) {
      throw new NotFoundException('Announcement not found');
    }
    Object.assign(ann, dto);

    return await this.repo.save(ann);
  }


  async allAnnouncements(
    teamId: number,
    pag: Pagination
  ) {
    const page = pag.page ?? 1;
    const limit = pag.limit ?? 10;

    const [items, total] = await this.repo.createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.team', 'team')
      .where('team.id = :teamId', { teamId })
      .orderBy('announcement.date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: plainToInstance(ReturnAnnouncementDto, items, { excludeExtraneousValues: true }),
      total,
      page,
      limit
    };
  }

  async allAnnoun(
    teamId: number
  ): Promise<ReturnAnnouncementDto[]> {
    const items = await this.repo.createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.team', 'team')
      .where('team.id = :teamId', { teamId })
      .orderBy('announcement.date', 'DESC')
      .getMany();



    return items;
  }
}
