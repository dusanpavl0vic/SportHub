import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CoachService } from './coach.service';
import { UpdateCoachDto } from './dto/update-coach.dto';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) { }

  @Get()
  findAll() {
    return this.coachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachService.update(+id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(+id);
  }
}
