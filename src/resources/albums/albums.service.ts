import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly repository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {  }
  async create(createAlbumDto: CreateAlbumDto) {
    const existingArtist = await this.artistRepository.findOne({ where: { id: createAlbumDto.artistId } });

    if (!existingArtist) {
      throw new NotFoundException(`Artist with ID ${createAlbumDto.artistId} not found`);
    }

    const album = new Album();
    Object.assign(album, createAlbumDto);
    album.artist = existingArtist;

    return this.repository.save(album);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['artist'] });
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
