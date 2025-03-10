import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator/index';
import { Player } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('player')
export class PlayerController {
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(["TEAM"])
    @Get('me')
    getMe(@GetUser('') player: Player) {
        return  player;
    }

}
