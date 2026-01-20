import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PlantHealth, PlantStatus } from "prisma/generated/enums";;
import { PaginationFilterDTO } from "src/common/dto/pagination-filter.dto";

export class PlantFiltersDTO extends PaginationFilterDTO {
  @IsOptional()
  @IsEnum(PlantStatus)
  status?: PlantStatus;

  @IsOptional()
  @IsEnum(PlantHealth)
  health?: PlantHealth;

  @IsOptional()
  @IsString()
  strainId?: string;

  @IsOptional()
  @IsString()
  harvestId?: string;

  @IsOptional()
  @IsString()
  search?: string;

}
