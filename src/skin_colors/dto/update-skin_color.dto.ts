import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinColorDto } from './create-skin_color.dto';

export class UpdateSkinColorDto extends PartialType(CreateSkinColorDto) {}
