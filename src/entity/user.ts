import { Exclude } from "class-transformer";
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  Length,
} from "class-validator";

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact";
import { Spam } from "./spam";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Contact, (contact) => contact.created_by)
  contact: Contact[];

  @OneToMany(() => Spam, (spam) => spam.user)
  spam: Spam[];

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

}
