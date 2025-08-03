import { Role } from "src/enum/role.enum";

export interface CreateUserDto {
  email: string;
  password: string;
  role: Role;
}
