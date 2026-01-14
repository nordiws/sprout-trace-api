import { Injectable } from "@nestjs/common"
import { IHarvestRepository } from "./interface/harvest-repository.interface"
import { Harvest, Prisma } from "prisma/generated/client"
import { PrismaService } from "src/prisma/prisma.service"
import { HarvestFiltersDTO } from "./dto/harvest-filter.dto"
import { HarvestWithPlants } from "./harvest.repository.types"

@Injectable()
export class HarvestRepository implements IHarvestRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(
        userId: string,
        filters: HarvestFiltersDTO
    ): Promise<{ data: HarvestWithPlants[]; total: number }> {

        const {
            page = 1,
            limit = 10,
            status,
            harvestType,
            search,
        } = filters;

        const where: Prisma.HarvestWhereInput = {
            userId,
            active: true,

            ...(status && { status }),
            ...(harvestType && { harvestType }),

            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        notes: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        };

        const [total, data] = await this.prisma.$transaction([
            this.prisma.harvest.count({ where }),

            this.prisma.harvest.findMany({
                where,
                include: {
                    plants: {
                        where: { active: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),
        ]);

        return { data, total };
    }

    findOne(userId: string, id: string): Promise<Harvest | null> {
        return this.prisma.harvest.findFirst({
            where: {
                id,
                userId,
                active: true
            }
        });
    }


    create(data: Prisma.HarvestCreateInput): Promise<Harvest> {
        return this.prisma.harvest.create({ data })
    }

    update(
        id: string,
        data: Prisma.HarvestUpdateInput
    ): Promise<Harvest> {
        return this.prisma.harvest.update({
            where: { id },
            data
        });
    }


    softDelete(userId: string, id: string): Promise<Harvest> {
        return this.prisma.harvest.update({ where: { id, userId, active: true }, data: { active: false } })
    }
}