import { User } from "../entity/users.entity";

export function BodyUserResp(user: User) {
    const body = {
        username: user.username,
        role: user.role
    }
    return body
}