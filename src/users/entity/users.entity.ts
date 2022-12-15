import { IsDefined } from "class-validator";
import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { Role } from "./users-role.enum";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    username: string

    @Column()
    password: string;

    @Column()
    role: Role
}
