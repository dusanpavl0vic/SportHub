import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportService {
  constructor(@Inject('SPORT_REPOSITORY') private repo: Repository<Sport>) { }

  async create(name: string, iconFilename: string): Promise<Sport> {
    const sport = this.repo.create({ name, iconFilename });
    return this.repo.save(sport);
  }

  async findByName(name: string): Promise<Sport | null> {
    return this.repo.findOne({ where: { name } });
  }

  async findAll(): Promise<Sport[]> {
    return this.repo.find();
  }

  async findById(id: number) {
    console.log('Tražim sport sa ID:', id);
    return this.repo.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateSportDto: UpdateSportDto) {
    return `This action updates a #${id} sport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sport`;
  }


}
