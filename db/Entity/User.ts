import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    // @Length(4,100)
    username: string

    @Column()
    // @Length(4,100)
    email: string

    @Column()
    // @Length(4,100)
    password: string

    @Column()
    // @IsNotEmpty()
    role: number

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}

