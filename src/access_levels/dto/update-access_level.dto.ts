import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessLevelDto } from './create-access_level.dto';

export class UpdateAccessLevelDto extends PartialType(CreateAccessLevelDto) {}
