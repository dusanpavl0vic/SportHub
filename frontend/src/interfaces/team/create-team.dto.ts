import { CreateUserDto } from '../user/create-user.dto';

export interface CreateTeamDto {
 name: string;
 profilePicture?: string;
 city: string;
 sportId: number;
}

export interface RegisterTeamDto extends CreateTeamDto {
 user: CreateUserDto;
}
