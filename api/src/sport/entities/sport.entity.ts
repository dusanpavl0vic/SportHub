import { ICON_BASE_URL } from 'src/config/constants';
import { Team } from 'src/team/entities/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    iconFilename: string;

    @OneToMany(() => Team, (team) => team.sport)
    teams: Team[];

    get iconUrl(): string | null {
        return this.iconFilename ? ICON_BASE_URL + this.iconFilename : null;
    }
}
