import { PlayerStatus } from "src/enum/player_status.enum";

export class MembershipDto {
  status: PlayerStatus;

  joinedAt: Date | null;

  leftAt: Date | null;
}