
import { User } from "src/users/entity/users.entity";
import { Warranty } from "src/warranties/entity/warranties.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany } from "typeorm";
import { WarrantyStatus } from "./warranty.enum";

@Entity()
export class Product {
    @ObjectIdColumn()
    id: string;

    @Column({ unique: true })
    name: string

    @Column()
    image_url: string

    @ManyToOne(_type => User, user => user.products, { eager: false })
    user: User

    @OneToMany(_type => Warranty, warranty => warranty.user, { eager: true })
    warranties: Warranty[]
}