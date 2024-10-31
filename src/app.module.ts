import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './resources/users/users.module';
import { OrdersModule } from './resources/orders/orders.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { FormatsModule } from './resources/formats/formats.module';
import { ItemsModule } from './resources/items/items.module';

@Module({
  imports: [UsersModule, OrdersModule, ArtistsModule, AlbumsModule, FormatsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
