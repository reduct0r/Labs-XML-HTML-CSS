import { Module } from '@nestjs/common';
import { StocksService } from './characters.service';
import { CharactersController } from './characters.controller';
import { FileService } from '../file.service';

@Module({
  controllers: [CharactersController],
  providers: [StocksService, FileService],
})
export class StocksModule {}