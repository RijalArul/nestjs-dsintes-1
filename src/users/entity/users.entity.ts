import { IsDefined } from "class-validator";
import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
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

}
