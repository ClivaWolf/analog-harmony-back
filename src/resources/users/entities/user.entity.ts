import { Order } from 'src/resources/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: ['customer', 'admin'],
        default: 'customer'
    })
    role: 'customer' | 'admin';

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}


