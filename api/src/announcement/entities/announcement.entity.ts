import { Team } from "src/team/entities/team.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Team, (team) => team.announcements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: Team;
}