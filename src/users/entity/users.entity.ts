import { IsDefined } from "class-validator";
import { Product } from "src/products/entity/products.entitty";
import { Warranty } from "src/warranties/entity/warranties.entity";
import { Entity, ObjectID, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { Role } from "./users-role.enum";
import { UserStatus } from "./users-status..enum";

@Entity()
export class User {
    @ObjectIdColumn()
    id: string;

    @Column({ unique: true })
    username: string

    @Column()
    password: string;

    @Column()
    role: Role

    @Column()
    status: UserStatus

    @OneToMany(_type => Product, product => product.user, { eager: true })
    products: Product[]

    @OneToMany(_type => Warranty, warranty => warranty.user, { eager: true })
    warranties: Warranty[]

}
