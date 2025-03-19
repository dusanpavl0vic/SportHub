import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator/index';
import { Player } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { PlayerService } from './player.service';

@Controller('player')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlayerController {
    
    constructor( private playerService: PlayerService ) {}
    
    @Roles(["PLAYER"])
    @Get('me')
    getMe(@GetUser('') player: Player) {
        return player;
    }

}
