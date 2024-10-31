import { Artist } from 'src/resources/artists/entities/artist.entity';
import { Item } from 'src/resources/items/entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    releaseYear?: number;

    @ManyToOne(() => Artist, (artist) => artist.albums)
    artist: Artist;

    @Column({ nullable: true })
    genre?: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Item, (item) => item.album)
    items: Item[];
}
