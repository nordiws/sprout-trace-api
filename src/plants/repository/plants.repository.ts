import { Injectable } from '@nestjs/common'
import { Plant, Prisma } from '@prisma/client'
import { IPlantsRepository } from '../interface/plants-repository.interface'
import { PlantFiltersDTO } from '../dto/plant-filter.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PlantWithStrainSeedHarvestLogs } from './plants.repository.types'
import { UpdatePlantDTO } from '../dto/update-plant.dto'

@Injectable()
export class PlantsRepository implements IPlantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllWithStrainAndLogs(
    userId: string,
    filters: PlantFiltersDTO,
  ): Promise<{ data: PlantWithStrainSeedHarvestLogs[]; total: number }> {
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
        include: {
          strain: true,
          seed: true,
          harvest: true,
          growthLogs: true,
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

  create(data: Prisma.PlantCreateInput): Promise<PlantWithStrainSeedHarvestLogs> {
    return this.prisma.plant.create({
      data,
      include: {
        strain: true,
        seed: true,
        harvest: true,
        growthLogs: true,
      },
    })
  }

async update(
  userId: string,
  id: string,
  data: UpdatePlantDTO,
): Promise<PlantWithStrainSeedHarvestLogs> {
  return this.prisma.plant.update({
    where: {
      id,
      userId,
      active: true,
    },
    include: {
      strain: true,
      seed: true,
      harvest: true,
      growthLogs: true,
    },
    data: {
      // Handle standard fields
      location: data.location,
      notes: data.notes,
      imageUrl: data.imageUrl,
      status: data.status,
      health: data.health,
      height: data.height,
      
      // Map Dates properly (Prisma needs Date objects, not strings)
      plantedDate: data.plantedDate ? new Date(data.plantedDate) : undefined,
      floweringDate: data.floweringDate ? new Date(data.floweringDate) : undefined,
      expectedHarvest: data.expectedHarvestDate ? new Date(data.expectedHarvestDate) : undefined,
      expectedFlowering: data.expectedFloweringDate ? new Date(data.expectedFloweringDate) : undefined,

      // Handle relations using connect
      strain: data.strainId ? { connect: { id: data.strainId } } : undefined,
      seed: data.seedId ? { connect: { id: data.seedId } } : undefined,
      harvest: data.harvestId ? { connect: { id: data.harvestId } } : undefined,

      // Handle the weight/quality fields from the UpdatePlantDTO
      wetWeight: data.wetWeight,
      dryWeight: data.dryWeight,
      quality: data.quality,
    },
  });
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
  ): Promise<PlantWithStrainSeedHarvestLogs | null> {
    return this.prisma.plant.findUnique({
      where: { id, userId, active: true },
      include: {
        strain: true,
        seed: true,
        harvest: true,
        growthLogs: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    })
  }
}
