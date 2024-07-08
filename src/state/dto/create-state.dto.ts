
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested,IsInt,IsNumber,IsNotEmpty,IsBoolean,IsEmail, IsString, Matches, MaxLength, MinLength,IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateStateDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(1)
	@IsString()
    name: string;
}
