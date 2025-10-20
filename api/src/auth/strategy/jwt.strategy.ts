import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/enum/role.enum';
import { PlayerService } from 'src/player/player.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private playerService: PlayerService,
    private teamService: TeamService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: any) {

    console.log("jwt.strategy");
    const { sub: id, role } = payload;

    switch (role) {

      case Role.PLAYER:
        const player = await this.playerService.findByUserId(id);
        if (!player) throw new UnauthorizedException('Player not found');
        return { id: player.id, role: role };

      case Role.TEAM:
        const team = await this.teamService.findByUserId(id);
        if (!team) throw new UnauthorizedException('Team not found');
        return { id: team.id, role: role };

      default:
        throw new UnauthorizedException('Invalid role');
    }
  }
}
