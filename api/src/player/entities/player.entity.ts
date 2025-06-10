import { PlayerStatus } from 'src/enum/player_status.enum';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
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
    profilePicture: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column()
    city: string;

    @Column({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.FREE })
    status: PlayerStatus;

    @ManyToOne(() => Team, (team) => team.players, { nullable: true })
    team: Team | null;

}