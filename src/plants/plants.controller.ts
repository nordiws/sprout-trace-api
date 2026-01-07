import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PlantFiltersDTO } from "./dto/plant-filter.dto";
import { CreatePlantDTO } from "./dto/create-plant.dto";
import { UpdatePlantDTO } from "./dto/update-plant.dto";
import { CreatePlantGrowthLogDTO } from "./dto/create-plant-growth.dto";

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() filters: PlantFiltersDTO
  ) {
    return this.plantsService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string
  ) {
    return this.plantsService.findOne(user.id, id);
  }

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreatePlantDTO
  ) {
    return this.plantsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdatePlantDTO
  ) {
    return this.plantsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: string
  ) {
    return this.plantsService.remove(user.id, id);
  }

  // Growth log
  @Post(':id/growth-log')
  addGrowthLog(
    @CurrentUser() user: { id: string },
    @Param('id') plantId: string,
    @Body() dto: CreatePlantGrowthLogDTO
  ) {
    return this.plantsService.addGrowthLog(user.id, plantId, dto);
  }
}
