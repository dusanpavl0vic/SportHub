import { Coach } from "src/coach/entities/coach.entity";
import { Player } from "src/player/entities/player.entity";
import { Sport } from "src/sport/entities/sport.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  city: string;

  @Column({ default: 0 })
  numberOfPlayers: number;

  @ManyToOne(() => Sport, { eager: true })
  @JoinColumn()
  sport: Sport;

  @OneToMany(() => Player, (player) => player.team)
  players?: Player[];

  @OneToMany(() => Coach, (coach) => coach.team)
  coaches?: Coach[];

}