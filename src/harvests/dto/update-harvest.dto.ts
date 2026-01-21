import { PartialType } from '@nestjs/swagger'
import { CreateHarvestDTO } from './create-harvest.dto'

export class UpdateHarvestDTO extends PartialType(CreateHarvestDTO) {}
