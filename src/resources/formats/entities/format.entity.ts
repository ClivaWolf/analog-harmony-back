import { Item } from 'src/resources/items/entities/item.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Format {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Item, (item) => item.format)
    items: Item[];
}