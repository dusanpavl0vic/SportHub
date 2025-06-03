import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { CoachService } from 'src/coach/coach.service';
import { RegisterCoachDto } from 'src/coach/dto/create-coach.dto';
import { RegisterPlayerDto } from 'src/player/dto/create-player.dto';
import { PlayerService } from 'src/player/player.service';
import { RegisterTeamDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';


@Injectable({})
export class AuthService {
    constructor(
        private jwt: JwtService,
        private configService: ConfigService,
        private playerService: PlayerService,
        private userService: UserService,
        private teamService: TeamService,
        private coachService: CoachService,
    ) { }

    async login(
        dto: LoginDto
    ): Promise<{ access_token: string }> {

        // find email from user in database
        const user = await this.userService.getUserByEmail(dto.email);

        console.log(user);

        if (!user)
            throw new ForbiddenException('Invalid credentials');

        const passwordMatch = await argon.verify(user.password, dto.password);

        if (!passwordMatch)
            throw new ForbiddenException('Invalid credentials');

        return this.signToken(user.id, user.email, user.role);

    }



    async registerPlayer(
        dto: RegisterPlayerDto,
    ): Promise<{ access_token: string }> {

        const hash = await argon.hash(dto.password);

        const player = await this.playerService.create({
            email: dto.email,
            password: hash,
            firstname: dto.firstname,
            lastname: dto.lastname,
            city: dto.city,
            birthdate: dto.birthdate,
        });

        if (!player) {
            throw new ForbiddenException('Player already exists');
        }

        return { access_token: "cao" };
        return this.signToken(player.id, player.email, player.role);
    }

    async registerTeam(
        dto: RegisterTeamDto,
    ): Promise<{ access_token: string }> {

        const hash = await argon.hash(dto.password);

        const team = await this.teamService.create({
            email: dto.email,
            password: hash,
            name: dto.name,
            city: dto.city,
        });

        if (!team) {
            throw new ForbiddenException('Team already exists');
        }

        return this.signToken(team.id, team.email, team.role);
    }

    async registerCoach(
        dto: RegisterCoachDto,
    ): Promise<{ access_token: string }> {

        const hash = await argon.hash(dto.password);

        const coach = await this.coachService.create({
            email: dto.email,
            password: hash,
            firstname: dto.firstname,
            lastname: dto.lastname,
            city: dto.city,
            teamId: dto.teamId,
        });

        return this.signToken(coach.id, coach.email, coach.role);
    }


    // TODO: access token make a proble in code
    async signToken(
        userId: number,
        email: string,
        role: string,
    ): Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            email,
            role
        };

        const token: string = await this.jwt.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
            secret: this.configService.get('JWT_SECRET'),
            algorithm: 'HS256',
        });

        return {
            access_token: token,
        }
    }
}
