import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PlantFiltersDTO } from './dto/plant-filter.dto'
import { CreatePlantDTO } from './dto/create-plant.dto'
import { UpdatePlantDTO } from './dto/update-plant.dto'
import { CreatePlantGrowthLogDTO } from './dto/create-plant-growth.dto'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { PlantsService } from './plants.service'
import { PlantGrowthLogDTOFactory } from './dto/plant-growth-log.dto.factory'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('plants')
@UseGuards(JwtAuthGuard)
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserContext,
    @Query() filters: PlantFiltersDTO,
  ) {
    return this.plantsService.findAll(user.id, filters)
  }

  @Get(':id')
  findOne(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.plantsService.findOne(user.id, id)
  }

  @Post()
  create(@CurrentUser() user: CurrentUserContext, @Body() dto: CreatePlantDTO) {
    return this.plantsService.create(user.id, dto)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string,
    @Body() dto: UpdatePlantDTO,
  ) {
    return this.plantsService.update(user.id, id, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.plantsService.softDelete(user.id, id)
  }

  @Post(':id/growth-log')
  addGrowthLog(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') plantId: string,
    @Body() dto: CreatePlantGrowthLogDTO,
  ) {
    const domainDto = PlantGrowthLogDTOFactory.createFromDTO(dto)
    return this.plantsService.addGrowthLog(user.id, plantId, domainDto)
  }
}
