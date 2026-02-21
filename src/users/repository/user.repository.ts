import { User } from "@prisma/client";
import IUserRepository from "../interfaces/user.repository.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(private readonly prisma: PrismaService) { }

    async upsertByExternalId(params: {
        externalId: string
        email?: string
        name?: string
    }): Promise<User> {
        const { externalId, email, name } = params
        return this.prisma.user.upsert({
            where: { externalId },
            update: {
                email,
                name,
            },
            create: {
                externalId,
                email,
                name,
                active: true,
            },
        })
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        })
    }
}

export default UserRepository