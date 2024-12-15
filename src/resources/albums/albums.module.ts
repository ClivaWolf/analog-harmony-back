import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Album, Artist]),
  ],
})
export class AlbumsModule {}
