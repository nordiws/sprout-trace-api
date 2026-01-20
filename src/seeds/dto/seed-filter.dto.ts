import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { PaginationFilterDTO } from "src/common/dto/pagination-filter.dto";

export class SeedFiltersDTO extends PaginationFilterDTO {
  @IsOptional()
  @IsString()
  strainId?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  harvestYear?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
