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
    // private coachService: CoachService,
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

    // TODO: Think about findByUserId only return the id of entity and not entier entity
    switch (role) {
      // case Role.COACH:
      //   const coach = await this.coachService.findByUserId(id);
      //   if (!coach) throw new UnauthorizedException('Coach not found');
      //   return coach;

      case Role.PLAYER:
        const player = await this.playerService.findByUserId(id);
        if (!player) throw new UnauthorizedException('Player not found');
        return player;

      case Role.TEAM:
        const team = await this.teamService.findByUserId(id);
        if (!team) throw new UnauthorizedException('Team not found');
        return team;

      default:
        throw new UnauthorizedException('Invalid role');
    }
  }
}
