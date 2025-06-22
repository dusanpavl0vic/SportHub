import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private repo: Repository<User>) { }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async getUserByEmail(email: string) {

    return this.repo.findOne(
      {
        where: { email },
      }
    );
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = this.repo.create(createUserDto);
  //   return this.repo.save(user);
  // }

  async create(createUserDto: CreateUserDto, manager?: EntityManager) {
    const user = this.repo.create(createUserDto);
    if (manager) {
      return manager.save(User, user);
    }
    return this.repo.save(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(
    userId: number
  ) {
    const user = await this.repo.findOne({
      where: {
        id: userId
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.repo.remove(user);
  }

  async removeUserTeam(
    teamId: number
  ) {
    const user = await this.repo.findOne({
      where: { team: { id: teamId } },
      relations: ['team'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.repo.remove(user);
  }
}
