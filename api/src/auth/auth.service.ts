import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Role } from 'src/enum/role.enum';
import { PlayerDto, RegisterPlayerDto } from 'src/player/dto/create-player.dto';
import { ReturnPlayerDto } from 'src/player/dto/update-player.dto';
import { PlayerService } from 'src/player/player.service';
import { SportService } from 'src/sport/sport.service';
import { ReturnTeamDto, TeamDto, TeamWithSportIdDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import { LoginDto } from './dto/login.dto';


@Injectable({})
export class AuthService {
    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSource: DataSource,
        private jwt: JwtService,
        private configService: ConfigService,
        private playerService: PlayerService,
        private userService: UserService,
        private teamService: TeamService,
        private sportService: SportService,
    ) { }

    async login(
        dto: LoginDto
    ): Promise<{ access_token: string, user: PlayerDto | TeamDto, role: Role }> {
        const user = await this.userService.getUserByEmail(dto.email);
        console.log(user);

        if (!user)
            throw new ForbiddenException('Invalid credentials');

        const passwordMatch = await argon.verify(user.password, dto.password);

        if (!passwordMatch)
            throw new ForbiddenException('Invalid credentials');

        const token = await this.signToken(user.id, user.email, user.role);

        let profile: PlayerDto | TeamDto;
        if (user.role == Role.PLAYER) {
            profile = await this.playerService.findByUserId(user.id);
        }
        else {
            profile = await this.teamService.findByUserId(user.id);
        }

        if (!profile) {
            throw new ForbiddenException('User profile not found');
        }

        return { access_token: token.access_token, user: profile, role: user.role };

    }



    async registerPlayer(
        dto: RegisterPlayerDto,
    ): Promise<{ access_token: string, player: ReturnPlayerDto, role: Role }> {
        const existingUser = await this.userService.getUserByEmail(dto.user.email);
        if (existingUser) {
            throw new ForbiddenException('User already exists');
        }

        const hash = await argon.hash(dto.user.password);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let player: ReturnPlayerDto;
        let token: { access_token: string };
        let teamId: number | undefined;
        try {
            const user = await this.userService.create(
                {
                    email: dto.user.email,
                    password: hash,
                    role: Role.PLAYER,
                },
                queryRunner.manager,
            );

            player = await this.playerService.create(
                {
                    user: user,
                    firstname: dto.firstname,
                    lastname: dto.lastname,
                    city: dto.city,
                    birthdate: dto.birthdate,
                    phoneNumber: dto.phoneNumber,
                },
                queryRunner.manager,
            );

            if (!player) {
                throw new ForbiddenException('Player already exists');
            }

            teamId = (await this.playerService.myTeam(player.id))?.id;


            token = await this.signToken(user.id, user.email, user.role);
            await queryRunner.commitTransaction();


        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
        return {
            access_token: token.access_token,
            player: {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                phoneNumber: player.phoneNumber,
                birthdate: player.birthdate,
                city: player.city,
                profilePicture: player.profilePicture,
                teamId: teamId
            },
            role: Role.PLAYER
        };
    }


    async registerTeam(
        dto: TeamWithSportIdDto,
    ): Promise<{ access_token: string, team: ReturnTeamDto, role: Role }> {

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

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let token: { access_token: string };
        let team: ReturnTeamDto;
        try {

            const user = await this.userService.create(
                {
                    email: teamDto.user.email,
                    password: hash,
                    role: Role.TEAM,
                },
                queryRunner.manager,
            );

            team = await this.teamService.create(
                {
                    user: user,
                    name: teamDto.name,
                    city: teamDto.city,
                    sport: existingSport,
                },
                queryRunner.manager
            );

            if (!team) {
                throw new ForbiddenException('Team already exists');
            }

            token = await this.signToken(user.id, user.email, user.role);
            await queryRunner.commitTransaction();


        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
        return {
            access_token: token.access_token,
            team: {
                id: team.id,
                name: team.name,
                city: team.city,
                profilePicture: team.profilePicture,
                sport: team.sport,
            },
            role: Role.TEAM
        }
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
