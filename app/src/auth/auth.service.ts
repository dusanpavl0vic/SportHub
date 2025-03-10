import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { AuthDto } from 'src/dto/auth.dto';
import { CreatePlayerDto, PlayerDto, ReturnPlayerDto } from 'src/dto/player.dto';
import { CreateTeamDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private configService: ConfigService,
    ) {}

    async signInPlayer(
        dto: AuthDto
    ): Promise<{access_token: string}> {

        try {
            const player = await this.prisma.player.findUnique({
                where: {
                    email: dto.email,
                },
            });

            console.log(player);

            if (!player)
                throw new ForbiddenException('Invalid credentials');

            const passwordMatch = await argon.verify(player.password, dto.password);

            if (!passwordMatch)
                throw new ForbiddenException('Invalid credentials');

            return this.signToken(player.id, player.email, player.role);
        }
        catch (error) {

            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new  ForbiddenException('Credentials already in use');

            throw error;

        }

    }

    async signInTeam(
        dto: AuthDto
    ): Promise<{access_token: string}> {

        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    email: dto.email,
                },
            });

            if (!team)
                throw new ForbiddenException('Invalid credentials');

            const passwordMatch = await argon.verify(team.password, dto.password);

            if (!passwordMatch)
                throw new ForbiddenException('Invalid credentials');

            return this.signToken(team.id, team.email, team.role);
        }
        catch (error) {

            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new  ForbiddenException('Credentials already in use');

            throw error;

        }

    }

    async signUpPlayer(
        dto: CreatePlayerDto,
    ): Promise<{access_token: string}> {

        try {
            const hash = await argon.hash(dto.password);

            const player = await this.prisma.player.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    role: Role.PLAYER,
                    city: dto.city,
                },
            });

            return this.signToken(player.id, player.email, player.role);
        }
        catch (error) {

            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new  ForbiddenException('Credentials already in use');

            throw error;

        }
    }

    async signUpTeam(
        dto: CreateTeamDto,
    ): Promise<{access_token: string}> {

        try {
            const hash = await argon.hash(dto.password);

            const team = await this.prisma.team.create({
                data: {
                    email: dto.email,
                    password: hash,
                    teamName: dto.teamName,
                    sport: dto.sport,
                    role: Role.TEAM,
                    city: dto.city,
                    numberOfPlayers: 0,
                },
            });

            return this.signToken(team.id, team.email, team.role);
        }
        catch (error) {

            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new  ForbiddenException('Credentials already in use');

            throw error;

        }
    }

    async signToken(
        userId: number,
        email: string,
        role: Role,
    ): Promise<{access_token: string}> {

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
