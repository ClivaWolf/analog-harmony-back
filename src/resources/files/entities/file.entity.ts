import { User } from "src/resources/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    filename: string

    @Column()
    originalName: string

    @Column()
    size: number

    @Column()
    mimetype: string

    @Column({ nullable: true })
    path: string

    @Column({ nullable: true })
    uploadedBy: string

    @ManyToOne(() => User, (user) => user.files)
    user: User;

    @DeleteDateColumn()
    deletedAt?: Date
}
