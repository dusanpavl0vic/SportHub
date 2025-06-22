import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  @Get('/name/:name')
  async getByName(@Param('name') name: string) {
    console.log('Tražim sport po imenu:', name);
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
  async findById(@Param('id', ParseIntPipe) id: number) {
    console.log('Searching for sport with ID:', id);
    try {
      const sport = await this.sportService.findById(id);
      if (!sport) {
        throw new NotFoundException(`Sport with ID ${id} not found`);
      }
      return sport;
    } catch (error) {
      console.error(`Error finding sport with ID ${id}:`, error);
      throw error;
    }
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
