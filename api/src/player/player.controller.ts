import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerService } from './player.service';

@UseInterceptors(ClassSerializerInterceptor)

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
