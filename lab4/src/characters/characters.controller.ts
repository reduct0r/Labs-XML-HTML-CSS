import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { StocksService as CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterkDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Controller('stocks')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    this.charactersService.create(createCharacterDto);
    return { message: 'Stock created successfully' };
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('attribute') attribute?: string,
    @Query('complexity') complexity?: string,
  ): Character[] {
    return this.charactersService.findAll(title, attribute, complexity);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Character | null {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateCharacterkDto) {
    this.charactersService.update(+id, updateStockDto);
    return {
      message: 'Stock updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.charactersService.remove(+id);
    return { message: 'Stock deleted successfully' };
  }
}