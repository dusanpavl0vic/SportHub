import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        if (err || !user) {
          throw new UnauthorizedException('Invalid token or user not found. Please login again');
        }
        return user;
      }
}