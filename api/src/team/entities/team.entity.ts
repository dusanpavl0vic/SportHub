// import { Coach } from "src/coach/entities/coach.entity";
import { Announcement } from "src/announcement/entities/announcement.entity";
import { Group } from "src/group/entities/group.entity";
import { Membership } from "src/membership/entities/membership.entity";
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

  @OneToMany(() => Membership, (membership) => membership.team)
  memberships: Membership[];

  @OneToMany(() => Announcement, (announcement) => announcement.team, {
    cascade: ['remove'],
  })
  announcements: Announcement[];

  @OneToMany(() => Group, (group) => group.team, {
    cascade: ['remove'],
  })
  groups: Group[];
}