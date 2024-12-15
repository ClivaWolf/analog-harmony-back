import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateAlbumDto {
    @ApiProperty({ example: 'Abbey Road', description: 'Album title' })
    @IsString({ message: 'title must be a string' })
    @IsNotEmpty({ message: 'title must not be empty' })
    title: string;

    @ApiProperty({ example: '2000', description: 'Album release year' })
    @IsInt({ message: 'releaseYear must be a number' })
    releaseYear?: number;

    @ApiProperty({ example: '2', description: 'Album artist id' })
    @IsInt({ message: 'artistId must be a number' })
    artistId: number;

    @ApiProperty({ example: 'Rock', description: 'Album genre' })
    @IsString({ message: 'genre must be a string' })
    genre?: string;

    @ApiProperty({ example: 'Album description', description: 'Album description' })
    @IsString({ message: 'description must be a string' })
    description?: string;

}




    // @Column()
    // title: string;

    // @Column({ nullable: true })
    // releaseYear?: number;

    // @ManyToOne(() => Artist, (artist) => artist.albums)
    // @JoinColumn({ name: 'artist_id' })
    // artist: Artist;

    // @Column({ nullable: true })
    // genre?: string;

    // @Column({ nullable: true })
    // description?: string;

    // @CreateDateColumn()
    // createdAt: Date;

    // @OneToMany(() => Item, (item) => item.album)
    // items: Item[];