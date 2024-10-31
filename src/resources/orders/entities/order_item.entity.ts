import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Item } from 'src/resources/items/entities/item.entity';


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    @ManyToOne(() => Item, (item) => item.orderItems)
    item: Item;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;
}