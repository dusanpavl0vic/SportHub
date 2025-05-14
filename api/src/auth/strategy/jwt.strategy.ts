import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Player, Role, Team} from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: any) {

    let user: Player | Team | null = null;

    if (payload.role === Role.PLAYER) {
      user = await this.prisma.player.findUnique({
        where: {
            id: payload.sub 
        },
      });
    } else if (payload.role === Role.TEAM) {
      user = await this.prisma.team.findUnique({
        where: {
            id: payload.sub 
        },
      });
    }

    return user;
  }
}
