import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  profilePicture: string;

  @ManyToOne(() => Team, (team) => team.coaches)
  team: Team;

}
