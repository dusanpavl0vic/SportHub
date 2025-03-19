import { Injectable } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {

    constructor( private prisma: PrismaService ) {}

    async getPlayerById(playerId: number){
        //TODO: Implement this method
    }

    async getPlayerByIdArray(playerIdArray: number[]){
        //TODO: Implement this method
    }
    
    async updatePlayer(){
        //TODO: Implement this method
    }

    async updateProfilePicture(){
        //TODO: Implement this method
    }

    async joinTeam(){
        //TODO: Implement this method
    }

    async exitTeam(){
        //TODO: Implement this method
    }

    async showTeamSchedule(){
        //TODO: Implement this method
    }

    async showTeammates(){
        //TODO: Implement this method
    }

}
