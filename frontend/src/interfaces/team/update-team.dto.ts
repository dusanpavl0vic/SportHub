import { CreateTeamDto } from "./create-team.dto";

export interface UpdateTeamDto extends Partial<Omit<CreateTeamDto, 'sport'>> { }

export interface ReturnTeamDto extends UpdateTeamDto {
  id: number;
}

export interface UpdateTeamProfileImageDto {
  id: number;
  profileImage: string;
}