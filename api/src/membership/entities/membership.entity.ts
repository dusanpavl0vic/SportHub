import { PlayerStatus } from "src/enum/player_status.enum";
import { Player } from "src/player/entities/player.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.memberships, { eager: true, onDelete: 'CASCADE' })
  player: Player;

  @ManyToOne(() => Team, (team) => team.memberships, { eager: true, onDelete: 'CASCADE' })
  team: Team;

  @Column({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.PENDING })
  status: PlayerStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  joinedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  leftAt: Date | null;
}


// eager: true - automatsko ucitavanje povezanih entiteta