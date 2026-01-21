import { IsEnum, IsOptional, IsString } from 'class-validator'
import { HarvestStatus, HarvestType } from '@prisma/client'
import { PaginationFilterDTO } from 'src/common/dto/pagination-filter.dto'

export class HarvestFiltersDTO extends PaginationFilterDTO {
  @IsOptional()
  @IsEnum(HarvestStatus)
  status?: HarvestStatus

  @IsOptional()
  @IsEnum(HarvestType)
  harvestType?: HarvestType

  @IsOptional()
  @IsString()
  search?: string
}
