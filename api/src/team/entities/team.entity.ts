import { Coach } from "src/coach/entities/coach.entity";
import { Role } from "src/enum/role.enum";
import { Player } from "src/player/entities/player.entity";
import { Sport } from "src/sport/entities/sport.entity";
import { User } from "src/user/entities/user.entity";
import { ChildEntity, Column, ManyToOne, OneToMany } from "typeorm";

@ChildEntity(Role.TEAM)
export class Team extends User {
  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  city: string;

  @Column({ default: 0 })
  numberOfPlayers: number;

  @ManyToOne(() => Sport, { eager: true })
  sport: Sport;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => Coach, (coach) => coach.team)
  coaches: Coach[];
}