import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dtos/dto';
import { CreatePlayerDto } from 'src/dtos/player.dto';
import { CreateTeamDto } from 'src/dtos/team.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signUpPlayer')
    signUpPlayer(@Body() dto: CreatePlayerDto) {
        return this.authService.signUpPlayer(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signInPlayer')
    signInPlayer(@Body() dto: AuthDto) {
        return this.authService.signInPlayer(dto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signUpTeam')
    signUpTeam(@Body() dto: CreateTeamDto) {
        return this.authService.signUpTeam(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signInTeam')
    signInTeam(@Body() dto: AuthDto) {
        return this.authService.signInTeam(dto);
    }
}
