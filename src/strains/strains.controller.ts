import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateStrainDTO } from './dto/create-strain.dto';
import { UpdateStrainDTO } from './dto/update-strain.dto';
import { StrainFiltersDTO } from './dto/strain-filter.dto';

@Controller('strains')
export class StrainsController {
  constructor(private readonly strainsService: StrainsService) {}

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() filters: StrainFiltersDTO
  ) {
    return this.strainsService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: number
  ) {
    return this.strainsService.findOne(user.id, id);
  }

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateStrainDTO
  ) {
    return this.strainsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: number,
    @Body() dto: UpdateStrainDTO
  ) {
    return this.strainsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: number
  ) {
    return this.strainsService.remove(user.id, id);
  }
}
