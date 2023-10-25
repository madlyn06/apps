import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn } from "typeorm"

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    // @Length(4,100)
    type: string
    @Column()
    
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}

