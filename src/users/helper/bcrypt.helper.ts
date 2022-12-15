import * as bcrypt from "bcrypt"
export async function HashPassword(password: string): Promise<string> {
    const genSalt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, genSalt)
    return hash
}

export async function ComparePassword(password: string, hashPassword: string) {
    const comparePass = await bcrypt.compare(password, hashPassword)
    return comparePass
}