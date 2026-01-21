import { PartialType } from '@nestjs/swagger'
import { CreateSeedDTO } from './create-seed.dto'

export class UpdateSeedDTO extends PartialType(CreateSeedDTO) {}
