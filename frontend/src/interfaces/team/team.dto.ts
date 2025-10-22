import { Sport } from "../sport/sport.dto";

export interface Team {
  id: number;

  name: string;

  profilePicture: string;

  city: string;

  numberOfPlayers: number;

  sport: Sport;

}