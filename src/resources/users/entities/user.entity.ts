import { Order } from 'src/resources/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './user-profile.entity';
import { File } from 'src/resources/files/entities/file.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

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

    @OneToOne(() => Profile, profile => profile.user, { nullable: true, cascade: true })
    @JoinColumn()
    profile?: Profile;

    @OneToMany(() => File, (file) => file.user)
    files: File[];
}


