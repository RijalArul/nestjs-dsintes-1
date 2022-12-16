import { IsDefined } from "class-validator";
import { Product } from "src/products/entity/products.entitty";
import { User } from "src/users/entity/users.entity";
import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { WarrantyRequest, WarrantyStatus } from "./warranties.enum";

@Entity()
export class Warranty {
    @ObjectIdColumn()
    id: string;

    @Column()
    request: WarrantyRequest

    @Column()
    status: WarrantyStatus

    @ManyToOne(_type => User, user => user.warranties, { eager: false })
    user: User

    @ManyToOne(_type => Product, product => product.warranties, { eager: false })
    product: Product
}
