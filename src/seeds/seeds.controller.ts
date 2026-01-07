import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SeedFiltersDTO } from "./dto/seed-filter.dto";
import { CreateSeedDTO } from "./dto/create-seed.dto";
import { UpdateSeedDTO } from "./dto/update-seed.dto";

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() filters: SeedFiltersDTO
  ) {
    return this.seedsService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: number
  ) {
    return this.seedsService.findOne(user.id, id);
  }

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateSeedDTO
  ) {
    return this.seedsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: number,
    @Body() dto: UpdateSeedDTO
  ) {
    return this.seedsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: number
  ) {
    return this.seedsService.remove(user.id, id);
  }
}
