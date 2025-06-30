import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { Roles } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  matchRoles(roles: Role[], userRoles: Role[]): boolean {
    return roles.some(role => userRoles.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("roles.guard");


    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    console.log(user);


    if (!this.matchRoles(roles, user.role)) {
      throw new ForbiddenException('You do not have the required roles to access this resource.');
    }

    console.log("roles.guard 2");

    return true;
  }
}