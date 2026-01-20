import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SeedFiltersDTO } from "./dto/seed-filter.dto";
import { CreateSeedDTO } from "./dto/create-seed.dto";
import { UpdateSeedDTO } from "./dto/update-seed.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { CurrentUserContext } from "src/auth/types/current-user.type";
import { SeedsService } from "./seeds.service";

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserContext,
    @Query() filters: SeedFiltersDTO
  ) {
    return this.seedsService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string
  ) {
    return this.seedsService.findOne(user.id, id);
  }

  @Post()
  create(
    @CurrentUser() user: CurrentUserContext,
    @Body() dto: CreateSeedDTO
  ) {
    return this.seedsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string,
    @Body() dto: UpdateSeedDTO
  ) {
    return this.seedsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string
  ) {
    return this.seedsService.softDelete(user.id, id);
  }
}
