import { Role } from 'src/enum/role.enum';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column, ManyToOne } from 'typeorm';


@ChildEntity(Role.COACH)
export class Coach extends User {
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
