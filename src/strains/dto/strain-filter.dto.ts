import { IsEnum, IsOptional, IsString } from 'class-validator'
import { StrainType } from 'prisma/generated/enums'
import { PaginationFilterDTO } from 'src/common/dto/pagination-filter.dto'

export class StrainFiltersDTO extends PaginationFilterDTO {
  @IsOptional()
  @IsEnum(StrainType)
  type?: StrainType

  @IsOptional()
  @IsString()
  search?: string
}
