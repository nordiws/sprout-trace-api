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
import { CreateStrainDTO } from './dto/create-strain.dto'
import { UpdateStrainDTO } from './dto/update-strain.dto'
import { StrainFiltersDTO } from './dto/strain-filter.dto'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import type { CurrentUserContext } from 'src/auth/types/auth.type'
import { StrainsService } from './strains.service'

@Controller('strains')
export class StrainsController {
  constructor(private readonly strainsService: StrainsService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserContext,
    @Query() filters: StrainFiltersDTO,
  ) {
    return this.strainsService.findAll(user.id, filters)
  }

  @Get(':id')
  findOne(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.strainsService.findOne(user.id, id)
  }

  @Post()
  create(
    @CurrentUser() user: CurrentUserContext,
    @Body() dto: CreateStrainDTO,
  ) {
    return this.strainsService.create(user.id, dto)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserContext,
    @Param('id') id: string,
    @Body() dto: UpdateStrainDTO,
  ) {
    return this.strainsService.update(user.id, id, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: CurrentUserContext, @Param('id') id: string) {
    return this.strainsService.softDelete(user.id, id)
  }
}
