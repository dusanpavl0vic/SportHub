import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    iconUrl: string;

    @OneToMany(() => Team, (team) => team.sport)
    teams: Team[];
}
