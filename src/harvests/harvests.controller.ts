import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { HarvestFiltersDTO } from "./dto/harvest-filter.dto";
import { CreateHarvestDTO } from "./dto/create-harvest.dto";
import { UpdateHarvestDTO } from "./dto/update-harvest.dto";
import { CreateHarvestTimelineDTO } from "./dto/create-harvest-timeline.dto";
import { HarvestService } from "./harvest.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";

@Controller('harvests')
export class HarvestsController {

  constructor(private readonly harvestService: HarvestService) { }

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() filters: HarvestFiltersDTO
  ) {
    return this.harvestService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string
  ) {
    return this.harvestService.findOne(user.id, id);
  }

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateHarvestDTO
  ) {
    return this.harvestService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateHarvestDTO
  ) {
    return this.harvestService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: string
  ) {
    return this.harvestService.softDelete(user.id, id);
  }

  @Post(':id/timeline')
  addTimelineEvent(
    @CurrentUser() user: { id: string },
    @Param('id') harvestId: string,
    @Body() dto: CreateHarvestTimelineDTO
  ) {
    return this.harvestService.addTimelineEvent(user.id, harvestId, dto);
  }
  
}
