import { UserDto } from "../user/create-user.dto";

export interface Player {
  id: number;

  firstname: string;

  lastname: string;

  phoneNumber: string;

  birthdate: Date;

  city: string;

  profilePicture: string;

  teamId: number

  user: UserDto
}
