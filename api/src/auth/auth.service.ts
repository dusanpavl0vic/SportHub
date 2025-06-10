import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { CoachService } from 'src/coach/coach.service';
import { RegisterCoachDto } from 'src/coach/dto/create-coach.dto';
import { Role } from 'src/enum/role.enum';
import { RegisterPlayerDto } from 'src/player/dto/create-player.dto';
import { PlayerService } from 'src/player/player.service';
import { SportService } from 'src/sport/sport.service';
import { TeamWithSportIdDto } from 'src/team/dto/create-team.dto';
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
        private sportService: SportService,
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

        const existingUser = await this.userService.getUserByEmail(dto.user.email);

        if (existingUser) {
            throw new ForbiddenException('User already exists');
        }

        const hash = await argon.hash(dto.user.password);

        const user = await this.userService.create({
            email: dto.user.email,
            password: hash,
            role: Role.PLAYER,
        });

        const player = await this.playerService.create({
            user: user,
            firstname: dto.firstname,
            lastname: dto.lastname,
            city: dto.city,
            birthdate: dto.birthdate,
        });

        return this.signToken(player.user.id, player.user.email, player.user.role);
    }

    async registerTeam(
        dto: TeamWithSportIdDto,
    ): Promise<{ access_token: string }> {

        const { sportId, ...teamDto } = dto;
        const existingUser = await this.userService.getUserByEmail(teamDto.user.email);

        if (existingUser) {
            throw new ForbiddenException('User already exists');
        }

        const existingSport = await this.sportService.findById(sportId);
        if (!existingSport) {
            throw new ForbiddenException('Sport does not exist');
        }

        const hash = await argon.hash(teamDto.user.password);

        const user = await this.userService.create({
            email: teamDto.user.email,
            password: hash,
            role: Role.TEAM,
        });




        const team = await this.teamService.create({
            user: user,
            name: teamDto.name,
            city: teamDto.city,
            sport: existingSport,
        });

        if (!team) {
            throw new ForbiddenException('Team already exists');
        }

        return this.signToken(team.user.id, team.user.email, team.user.role);
    }

    async registerCoach(
        dto: RegisterCoachDto,
    ): Promise<{ access_token: string }> {

        const existingUser = await this.userService.getUserByEmail(dto.user.email);

        if (existingUser) {
            throw new ForbiddenException('User already exists');
        }

        const hash = await argon.hash(dto.user.password);

        const user = await this.userService.create({
            email: dto.user.email,
            password: hash,
            role: Role.COACH,
        });

        const coach = await this.coachService.create({
            user: user,
            firstname: dto.firstname,
            lastname: dto.lastname,
            city: dto.city,
            teamId: dto.teamId,
        });

        return this.signToken(coach.user.id, coach.user.email, coach.user.role);
    }


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
