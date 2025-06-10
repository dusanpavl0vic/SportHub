import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ICON_STORAGE_PATH } from 'src/config/constants';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';
import { SportService } from './sport.service';

@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new sport with an icon image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Form data for creating a sport',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Football',
        },
        icon: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Sport successfully created' })
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: join(process.cwd(), ICON_STORAGE_PATH),
        filename: (req, file, cb) => {
          const sportName = req.body.name?.toLowerCase().replace(/\s+/g, '-');
          const ext = extname(file.originalname);
          cb(null, `${sportName}${ext}`);
        },
      }),
    }),
  )
  async createSport(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSportDto: CreateSportDto,
  ) {
    if (!file) throw new BadRequestException('Icon image is required');
    const sport = await this.sportService.create(createSportDto.name, file.originalname);
    return {
      ...sport,
      iconUrl: sport.iconUrl,
    };
  }

  @Get(':name')
  async getByName(@Param('name') name: string) {
    const sport = await this.sportService.findByName(name);
    if (!sport) throw new BadRequestException('Sport not found');
    return {
      ...sport,
      iconUrl: sport.iconUrl,
    };
  }

  @Get()
  findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto) {
    return this.sportService.update(+id, updateSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.remove(+id);
  }
}
