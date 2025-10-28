
export interface CreateUserDto {
  email: string;
  password: string;
}


export interface UserDto {
  id: number;
  email: string;
  role: string;
}
