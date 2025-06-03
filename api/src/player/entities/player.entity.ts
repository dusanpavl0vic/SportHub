import { PlayerStatus } from 'src/enum/player_status.enum';
import { Role } from 'src/enum/role.enum';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, ChildEntity } from 'typeorm';

@ChildEntity(Role.PLAYER)
export class Player extends User {
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column()
    city: string;

    @Column({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.FREE })
    status: PlayerStatus;

    @ManyToOne(() => Team, (team) => team.players)
    team: Team;
}