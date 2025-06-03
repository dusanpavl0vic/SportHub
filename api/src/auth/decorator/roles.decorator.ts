import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';

export const Roles = Reflector.createDecorator<Role[]>();


