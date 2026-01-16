import { PrismaService } from "src/prisma/prisma.service";
import { IStrainsRepository } from "../interfaces/strains-repository.interface";
import { Prisma, Strain } from "prisma/generated/client";
import { StrainCreateInput, StrainUpdateInput } from "prisma/generated/models";
import { StrainFiltersDTO } from "../dto/strain-filter.dto";
import { StrainWithPlants } from "./strains.repository.types";

export class StrainsRepository implements IStrainsRepository {

    constructor(private readonly prisma: PrismaService) { }
    async findAll(userId: string, filters: StrainFiltersDTO): Promise<{ data: Strain[]; total: number; }> {
        const {
            page = 1,
            limit = 10,
            type,
            search
        } = filters;

        const where: Prisma.StrainWhereInput = {
            userId,
            active: true,
            ...(type && { type }),
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            })
        }

        const [total, data] = await this.prisma.$transaction([
            this.prisma.strain.count({ where }),
            this.prisma.strain.findMany({
                where,
                include: {
                    plants: {
                        where: { active: true }
                    }
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])

        return { total, data };

    }
    async findOne(userId: string, id: string): Promise<Strain | null> {
        return await this.prisma.strain.findFirst({
            where: {
                id,
                active: true
            }
        });
    }
    create(data: StrainCreateInput): Promise<Strain> {
        return this.prisma.strain.create({
            data
        });
    }
    update(id: string, data: StrainUpdateInput): Promise<Strain> {
        return this.prisma.strain.update({
            where: {
                id,
                active: true
            },
            data
        });
    }
    async softDelete(userId: string, id: string): Promise<Strain> {
        return await this.prisma.strain.update({
            where: {
                id,
                userId,
                active: true
            },
            data: {
                active: false
            }
        });
    }

    findByIdWithPlants(userId: string, id: string): Promise<StrainWithPlants | null> {
        return this.prisma.strain.findFirst({
            where: {
                id,
                userId,
                active: true
            },
            include: {
                plants: {
                    where: {
                        active: true
                    }
                }
            }
        });
    }

}