import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnnouncementWithTeamDto } from './dto/create-announcement.dto';
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
    const ann = await this.findOne(id);

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
  ) {
    return await this.repo.findOne({
      where: { id: id }
    });
  }

}
