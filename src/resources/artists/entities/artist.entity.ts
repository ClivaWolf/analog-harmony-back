import { Album } from 'src/resources/albums/entities/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    bio?: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Album, (album) => album.artist)
    albums: Album[];
}
