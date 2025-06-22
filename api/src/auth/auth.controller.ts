import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterPlayerDto } from 'src/player/dto/create-player.dto';
import { TeamWithSportIdDto } from 'src/team/dto/create-team.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    loginPlayer(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('registerPlayer')
    registerPlayer(@Body() dto: RegisterPlayerDto) {
        return this.authService.registerPlayer(dto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('registerTeam')
    registerTeam(@Body() dto: TeamWithSportIdDto) {
        return this.authService.registerTeam(dto);
    }

    // @HttpCode(HttpStatus.CREATED)
    // @Post('registerCoach')
    // registerCoach(@Body() dto: RegisterCoachDto) {
    //     return this.authService.registerCoach(dto);
    // }
}
