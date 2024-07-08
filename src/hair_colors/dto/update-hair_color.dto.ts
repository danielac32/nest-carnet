import { PartialType } from '@nestjs/mapped-types';
import { CreateHairColorDto } from './create-hair_color.dto';

export class UpdateHairColorDto extends PartialType(CreateHairColorDto) {}
