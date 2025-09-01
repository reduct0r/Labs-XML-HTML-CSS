import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterkDto extends PartialType(CreateCharacterDto) {}