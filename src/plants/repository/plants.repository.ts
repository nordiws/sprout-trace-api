import { Injectable } from '@nestjs/common'
import { Plant, Prisma } from '@prisma/client'
import { IPlantsRepository } from '../interface/plants-repository.interface'
import { PlantFiltersDTO } from '../dto/plant-filter.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PlantWithStrainAndLogs } from './plants.repository.types'

@Injectable()
export class PlantsRepository implements IPlantsRepository {
  
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    userId: string,
    filters: PlantFiltersDTO,
  ): Promise<{ data: Plant[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      status,
      health,
      strainId,
      harvestId,
      search,
    } = filters

    const where: Prisma.PlantWhereInput = {
      userId,
      active: true,
      ...(status && { status }),
      ...(health && { health }),
      ...(strainId && { strainId }),
      ...(harvestId && { harvestId }),
      ...(search && {
        OR: [
          {
            code: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            notes: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            location: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.plant.count({ where }),
      this.prisma.plant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    return { total, data }
  }

  findOne(userId: string, id: string): Promise<Plant | null> {
    return this.prisma.plant.findFirst({
      where: {
        id,
        userId,
        active: true,
      },
    })
  }

  create(data: Prisma.PlantCreateInput): Promise<Plant> {
    return this.prisma.plant.create({
      data,
    })
  }

  update(
    userId: string,
    id: string,
    data: Prisma.PlantUpdateInput,
  ): Promise<Plant> {
    return this.prisma.plant.update({
      where: {
        id,
        userId,
        active: true,
      },
      data,
    })
  }

  async softDelete(userId: string, id: string): Promise<void> {
    await this.prisma.plant.update({
      where: {
        id,
        userId,
        active: true,
      },
      data: {
        active: false,
      },
    })
  }

  findByIdWithLastLog(
    userId: string,
    id: string,
  ): Promise<PlantWithStrainAndLogs | null> {
    return this.prisma.plant.findUnique({
      where: { id, userId, active: true },
      include: {
        strain: true,
        growthLogs: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    })
  }
}
