import { Prisma, Seed } from "prisma/generated/client";
import { SeedCreateInput, SeedUpdateInput } from "prisma/generated/models";
import { SeedFiltersDTO } from "../dto/seed-filter.dto";
import { ISeedsRepository } from "../interface/seeds-repository.interface";
import { SeedWithStrain } from "./seeds.repository.types";
import { PrismaService } from "src/prisma/prisma.service";

export class SeedsRepository implements ISeedsRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(userId: string, filters: SeedFiltersDTO): Promise<{ data: Seed[]; total: number; }> {
        const {
            page = 1,
            limit = 10,
            search,
            strainId,
            country,
            harvestYear
        } = filters;

        const where: Prisma.SeedWhereInput =  {
            userId,
            active: true,
            ...(strainId && { strainId }),
            ...(country && {
                country: {
                    contains: country,
                    mode: "insensitive"
                }
            }),
            ...(harvestYear && {
                harvestYear: {
                    contains: harvestYear,
                    mode: "insensitive"
                }
            }),
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        nombreCultivar: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        country: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        code: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            })
        }

        const [total, data] = await this.prisma.$transaction([
            this.prisma.seed.count({ where }),
            this.prisma.seed.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])
        return { total, data };
    }

    findOne(userId: string, id: string): Promise<Seed | null> {
        return this.prisma.seed.findFirst({
            where: {
                id,
                userId,
                active: true
            }
        });
    }

    create(data: SeedCreateInput): Promise<Seed> {
        return this.prisma.seed.create({
            data
        });
    }

    update(userId: string, id: string, data: SeedUpdateInput): Promise<Seed> {
        return this.prisma.seed.update({
            where: {
                id,
                userId,
                active: true
            },
            data
        });
    }

    softDelete(userId: string, id: string): Promise<Seed> {
        return this.prisma.seed.update({
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

    findByIdWithStrain(userId: string, id: string): Promise<SeedWithStrain | null> {
        return this.prisma.seed.findUnique({
            where: { id, userId, active: true },
            include: {
                strain: true
            }
        });
    }
}