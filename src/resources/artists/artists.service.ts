import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { BaseService } from 'src/shared/base.service';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private repository: Repository<Artist>
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.repository.save(createArtistDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.repository.update(id, updateArtistDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
