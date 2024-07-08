import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested,IsInt,IsNumber,IsNotEmpty,IsBoolean,IsEmail, IsString, Matches, MaxLength, MinLength,IsOptional,IsDate } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCarnetDto {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
   
  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  card_code?: string;


  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  expiration: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cedule?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  extent?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  cellpone?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  photo?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  qr?: string;

  //@IsOptional()
  //@ValidateNested()
  //@Type(() => DepartmentDto)
  //department?: DepartmentDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  department?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => ChargeDto)
  //charge?: ChargeDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  charge?: number;

  //@IsArray()
  //@ValidateNested({ each: true })
  //@Type(() => TypeCreationDto)
  //type_creations: TypeCreationDto[];
  //@ApiProperty()
  //@IsOptional()
  //@IsString()
  //type_creations?: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  type_creations?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => TextureDto)
  //textures?: TextureDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  textures?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => StatusDto)
  //status?: StatusDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  status?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => AccessLevelDto)
  //access_levels?: AccessLevelDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  access_levels?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => GenderDto)
  //genders?: GenderDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  genders?: number;
  //@IsOptional()
  //@ValidateNested()
  //@Type(() => HairColorDto)
  //hair_colors?: HairColorDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  hair_colors?: number;

  //@IsOptional()
  //@ValidateNested()
  //@Type(() => StateDto)
  //state?: StateDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  state?: number;

  
  @ApiProperty()
  @IsOptional()
  @IsString()
  municipalities?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  parishes?: string;

  //@IsOptional()
  //@ValidateNested()
  //@Type(() => SkinColorDto)
  //skin_colors?: SkinColorDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  skin_colors?: number;

  //@IsOptional()
  //@ValidateNested()
  //@Type(() => CivilStatusDto)
 // civil_statuses?: CivilStatusDto;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  civil_statuses?: number;
  
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}