import { Schedule } from "src/schedule/entities/schedule.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.groups, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'teamId' })
  team: Team;

  @OneToMany(() => Schedule, (schedule) => schedule.group, {
    cascade: ['remove'],
  })
  schedules: Schedule[];
}