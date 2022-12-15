import { User } from "../entity/users.entity";

export function BodyUserResp(user: User) {
    const body = {
        username: user.username,
        role: user.role,
        status: user.status
    }
    return body
}

export function BodyLoginResp(token: string, user: User) {
    const body = {
        accessToken: token,
        role: user.role,
        status: user.status
    }
    return body
}