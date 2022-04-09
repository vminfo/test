import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {hash} from 'bcrypt';

@Entity({ name: 'users'})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column({select: false})
    password: string

    @Column({ default: 'Йошкар-Ола' })
    city: string

    @Column({ default: 'Лицей №28 г.Йошкар-Олы' })
    school: string

    @Column({ default: 7 })
    yearStudy: number

    @Column({ default: 'A' })
    liter: string

    @Column({ default: 0 })
    points: number

    @Column({ default: false })
    isBanned: boolean

    @Column({ default: false })
    isActive: boolean

    @Column({ default: '21.12.21' })
    createdAt: string

    @Column({ default: '1' })
    role: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}