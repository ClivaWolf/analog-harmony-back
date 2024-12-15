import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './resources/users/users.module';
import { OrdersModule } from './resources/orders/orders.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { FormatsModule } from './resources/formats/formats.module';
import { ItemsModule } from './resources/items/items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './app/database.module';
import { TypeOrmConfig } from './app/type-orm.config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './resources/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseModule], // Указываем DatabaseModule в imports
      useFactory: async (configService: ConfigService, typeOrmConfig: TypeOrmConfig) => {
        return typeOrmConfig.createConnectionOptions();
      },
      inject: [ConfigService, TypeOrmConfig],
    }),
    FilesModule,
    AlbumsModule,
    ArtistsModule,
    FormatsModule,
    ItemsModule,
    OrdersModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
