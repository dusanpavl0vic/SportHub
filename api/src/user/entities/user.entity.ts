import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Coach } from 'src/coach/entities/coach.entity';
import { Role } from 'src/enum/role.enum';
import { Player } from 'src/player/entities/player.entity';
import { Team } from 'src/team/entities/team.entity';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @OneToOne(() => Player, (player) => player.user)
  player: Player;

  @OneToOne(() => Team, (team) => team.user)
  team: Team;

  @OneToOne(() => Coach, (coach) => coach.user)
  coach: Coach;
}
