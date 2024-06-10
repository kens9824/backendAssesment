import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Spam } from "./spam";


@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @ManyToOne(() => User, (user) => user.contact)
    created_by: User;

    @OneToMany(() => Spam, (spam) => spam.contact)
    spam: Spam[];

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;
}
