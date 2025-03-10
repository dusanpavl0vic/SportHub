import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/dto';
import { CreatePlayerDto } from 'src/dto/player.dto';
import { CreateTeamDto } from 'src/dto/team.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signUpPlayer')
    signUpPlayer(@Body() dto: CreatePlayerDto) {
        return this.authService.signUpPlayer(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signInPlayer')
    signInPlayer(@Body() dto: AuthDto) {
        return this.authService.signInPlayer(dto);
    }

    @HttpCode(HttpStatus.OK)
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
