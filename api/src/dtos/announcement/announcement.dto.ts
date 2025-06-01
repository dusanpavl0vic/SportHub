import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsString, IsArray, ValidateNested, IsOptional} from 'class-validator';

class PictureDto {
  @Expose() id: number;
  @Expose() url: string;
}

export class CreateAnnouncementDto {
  @IsNumber()
  teamId: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => PictureDto)
  pictures?: PictureDto[];
}

export class UpdateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => PictureDto)
  pictures?: PictureDto[];
}

export class AnnouncementCardDto {
    @Expose() id: number;
    @Expose() title: string;
    
    @Expose()
    @Transform(({ value }) => value?.substring(0, 100) + (value?.length > 100 ? '...' : ''))
    description?: string;
    
    @Expose() 
    @Type(() => Date)
    date: Date;
    
    @Expose()
    @Type(() => PictureDto)
    coverImage?: PictureDto;
  }

export class ShowAnnouncementDto {
  id: number;
  title: string;
  descriptionPart?: string;
  date: Date;
}