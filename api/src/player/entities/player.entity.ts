import { Membership } from 'src/membership/entities/membership.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
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

    @OneToMany(() => Membership, (membership) => membership.player)
    memberships: Membership[];

    // get profilePictureUrl(): string | null {
    //     return PLAYER_PROFILEIMAGE_BASE_URL + this.profilePicture + '/' + this.id;
    // }
}