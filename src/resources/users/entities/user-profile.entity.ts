import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    user: User

    @Column({nullable:true})
    name: string

    @Column({nullable:true})
    surname: string

    @Column({nullable:true})
    patronymic: string

    @Column({nullable:true})
    birthday: Date

    @Column({nullable:true})
    city: string

    @Column({nullable:true})
    avatar: string

    @Column({default: false, nullable:true})
    emailVisible: boolean

    @Column({nullable:true})
    signature: string
}