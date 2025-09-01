import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterkDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { FileService } from '../file.service';

interface AttributeInterface {
  id: number;
  name: string;
}

interface ComplexityInterface {
  id: number;
  level: number;
}

interface CharacterInterface {
  id: number;
  src: string;
  title: string;
  text: string;
  description: string;
  attribute_id: number;
  complexity_id: number;
}

interface Data {
  attributes: AttributeInterface[];
  complexities: ComplexityInterface[];
  characters: CharacterInterface[];
}

@Injectable()
export class StocksService {
  constructor(private readonly fileService: FileService<Data>) {}

  private getData(): Data {
    let data = this.fileService.read();
    // Инициализация, если файл пустой или не существует
    if (!data || !data.attributes || data.attributes.length === 0) {
      data = {
        attributes: [
          { id: 1, name: 'strength' },
          { id: 2, name: 'agility' },
          { id: 3, name: 'intelligence' },
          { id: 4, name: 'universal' },
        ],
        complexities: [
          { id: 1, level: 1 },
          { id: 2, level: 2 },
          { id: 3, level: 3 },
        ],
        characters: [],
      };
      this.fileService.write(data);
    }
    return data;
  }

  private saveData(data: Data): void {
    this.fileService.write(data);
  }

  create(createStockDto: CreateCharacterDto) {
    const data = this.getData();
    const maxId = data.characters.reduce((max, char) => Math.max(max, char.id), 0) + 1;

    const attr = data.attributes.find(a => a.name.toLowerCase() === createStockDto.attribute.toLowerCase());
    if (!attr) {
      throw new Error('Invalid attribute');
    }

    const comp = data.complexities.find(c => c.level === createStockDto.complexity);
    if (!comp) {
      throw new Error('Invalid complexity');
    }

    const newCharacter: CharacterInterface = {
      id: maxId,
      src: createStockDto.src,
      title: createStockDto.title,
      text: createStockDto.text,
      description: createStockDto.description,
      attribute_id: attr.id,
      complexity_id: comp.id,
    };

    data.characters.push(newCharacter);
    this.saveData(data);
  }

  findAll(title?: string, attribute?: string, complexity?: string): Character[] {
    const data = this.getData();
    let characters = data.characters;

    const mapped: Character[] = characters.map(char => {
      const attr = data.attributes.find(a => a.id === char.attribute_id);
      const comp = data.complexities.find(c => c.id === char.complexity_id);
      return {
        id: char.id,
        src: char.src,
        title: char.title,
        text: char.text,
        description: char.description,
        attribute: attr ? attr.name : '',
        complexity: comp ? comp.level : 0,
      };
    });

    let filtered = mapped;
    if (title) {
      filtered = filtered.filter(stock => stock.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (attribute) {
      filtered = filtered.filter(stock => stock.attribute.toLowerCase() === attribute.toLowerCase());
    }
    if (complexity) {
      filtered = filtered.filter(stock => stock.complexity === parseInt(complexity, 10));
    }

    return filtered;
  }

  findOne(id: number): Character | null {
    const data = this.getData();
    const char = data.characters.find(c => c.id === id);
    if (!char) return null;

    const attr = data.attributes.find(a => a.id === char.attribute_id);
    const comp = data.complexities.find(c => c.id === char.complexity_id);

    return {
      id: char.id,
      src: char.src,
      title: char.title,
      text: char.text,
      description: char.description,
      attribute: attr ? attr.name : '',
      complexity: comp ? comp.level : 0,
    };
  }

  update(id: number, updateStockDto: UpdateCharacterkDto) {
    const data = this.getData();
    const char = data.characters.find(c => c.id === id);
    if (!char) return;

    if (updateStockDto.src) char.src = updateStockDto.src;
    if (updateStockDto.title) char.title = updateStockDto.title;
    if (updateStockDto.text) char.text = updateStockDto.text;
    if (updateStockDto.description) char.description = updateStockDto.description;

    if (updateStockDto.attribute !== undefined) {
      const attrName = updateStockDto.attribute.toLowerCase();
      const attr = data.attributes.find(a => a.name.toLowerCase() === attrName);
      if (attr) char.attribute_id = attr.id;
    }

    if (updateStockDto.complexity !== undefined) {
      const comp = data.complexities.find(c => c.level === updateStockDto.complexity);
      if (comp) char.complexity_id = comp.id;
    }

    this.saveData(data);
  }

  remove(id: number) {
    const data = this.getData();
    data.characters = data.characters.filter(c => c.id !== id);
    this.saveData(data);
  }
}