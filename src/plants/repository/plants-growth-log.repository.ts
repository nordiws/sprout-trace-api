import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { IPlantsGrowthLogRepository } from '../interface/plants-growth-log-repository.interface'
import { PlantGrowthLog, Prisma } from '@prisma/client'

@Injectable()
export class PlantGrowthLogRepository implements IPlantsGrowthLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  addGrowthLog(
    data: Prisma.PlantGrowthLogCreateInput,
  ): Promise<PlantGrowthLog> {
    return this.prisma.plantGrowthLog.create({ data })
  }
}
