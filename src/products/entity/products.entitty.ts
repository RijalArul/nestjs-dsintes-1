
import { User } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn } from "typeorm";
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
}