import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Contact } from "./contact";


@Entity()
export class Spam extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({default: 1})
    count: number;

    @Column()
    isRegistered: boolean;

    @Column()
    isContact: boolean;

    @ManyToOne(() => User, (user) => user.spam)
    user: User;

    @ManyToOne(() => Contact, (contact) => contact.spam)
    contact: Contact;

    @Column({ type: "timestamp" })
    created_at: Date;

    @Column({ type: "timestamp" })
    updated_at: Date;
}
