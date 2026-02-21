import { User } from "@prisma/client";

export default interface IUserRepository {
    upsertByExternalId(params: {
        externalId: string
        email?: string
        name?: string
    }): Promise<User>

    findById(id: string): Promise<User | null>
}