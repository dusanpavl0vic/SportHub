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

    const { sub: id, role } = payload;

    switch (role) {

      case Role.PLAYER:
        const playerId = await this.playerService.findByUserId(id);
        if (!playerId) throw new UnauthorizedException('Player not found');
        return playerId;

      case Role.TEAM:
        const teamId = await this.teamService.findByUserId(id);
        if (!teamId) throw new UnauthorizedException('Team not found');
        return teamId;

      default:
        throw new UnauthorizedException('Invalid role');
    }
  }
}
