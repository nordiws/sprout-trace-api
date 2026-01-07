import { PartialType } from "@nestjs/swagger";
import { CreateStrainDTO } from "./create-strain.dto";

export class UpdateStrainDTO extends PartialType(CreateStrainDTO) {}