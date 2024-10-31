import { Album } from 'src/resources/albums/entities/album.entity';
import { Format } from 'src/resources/formats/entities/format.entity';
import { OrderItem } from 'src/resources/orders/entities/order_item.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Album, (album) => album.items)
    album: Album;

    @ManyToOne(() => Format, (format) => format.items)
    format: Format;

    @Column({
        type: 'enum',
        enum: ['new', 'used', 'reissue']
    })
    condition: 'new' | 'used' | 'reissue';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
    orderItems: OrderItem[];
}