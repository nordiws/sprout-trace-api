export class StrainDTO {
    id: number;
    name: string;

    static fromEntity(entity: any): StrainDTO {
        const dto = new StrainDTO();
        return dto;
    }
}