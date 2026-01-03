import { CreateUserDto } from '../user/create-user.dto';

export interface CreatePlayerDto {
 firstname: string;
 lastname: string;
 phoneNumber?: string;
 birthdate: Date;
 city: string;
}

export interface RegisterPlayerDto extends CreatePlayerDto {
 user: CreateUserDto;
}
