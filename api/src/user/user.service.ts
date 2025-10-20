import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { ChangePasswordDto } from 'src/player/dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private repo: Repository<User>) { }

  async getUserByEmail(email: string) {

    return this.repo.findOne(
      {
        where: { email },
      }
    );
  }

  async create(createUserDto: CreateUserDto, manager?: EntityManager) {
    const user = this.repo.create(createUserDto);
    if (manager) {
      return manager.save(User, user);
    }
    return this.repo.save(user);
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

  async changePassword(
    user: User,
    passwords: ChangePasswordDto
  ) {
    const { oldPassword, newPassword } = passwords;

    const valid = await argon.verify(user.password, oldPassword);
    if (!valid) {
      throw new BadRequestException('Old password is incorrect');
    }


    const hash = await argon.hash(newPassword);

    await this.repo.update(user.id, {
      password: hash
    })

    return true;
  }

  async createWithManager(manager: EntityManager, dto: CreateUserDto): Promise<User> {
    return manager.save(User, dto);
  }
}
