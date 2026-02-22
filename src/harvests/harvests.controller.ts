import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { HarvestFiltersDTO } from './dto/harvest-filter.dto'
import { CreateHarvestDTO } from './dto/create-harvest.dto'
import { UpdateHarvestDTO } from './dto/update-harvest.dto'
import { CreateHarvestTimelineDTO } from './dto/create-harvest-timeline.dto'
import { HarvestsService } from './harvests.service'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import type { CurrentUserContext } from 'src/auth/types/auth.type'

@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserContext,
    @Query() filters: HarvestFiltersDTO,
  ) {
    return this.harvestsService.findAll(user.id, filters)
  }

  @Get(':id')
  findOne(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.harvestsService.findOne(user.id, id)
  }

  @Post()
  create(
    @CurrentUser() user: CurrentUserContext,
    @Body() dto: CreateHarvestDTO,
  ) {
    return this.harvestsService.create(user.id, dto)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string,
    @Body() dto: UpdateHarvestDTO,
  ) {
    return this.harvestsService.update(user.id, id, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.harvestsService.softDelete(user.id, id)
  }

  @Post(':id/timeline')
  addTimelineEvent(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') harvestId: string,
    @Body() dto: CreateHarvestTimelineDTO,
  ) {
    return this.harvestsService.addTimelineEvent(user.id, harvestId, dto)
  }
}
