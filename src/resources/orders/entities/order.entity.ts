import { User } from 'src/resources/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './order_item.entity';


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({
        type: 'enum',
        enum: ['pending', 'shipped', 'delivered', 'cancelled']
    })
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[];
}