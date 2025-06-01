import { Announcement, Group, Player } from "@prisma/client";


export interface Team {
  id: number;
  teamName: string;
  city: string;
  sport: string;
  profilePicture?: string;
  players: Player[];
  announcements: Announcement[];
  groups: Group[];
}