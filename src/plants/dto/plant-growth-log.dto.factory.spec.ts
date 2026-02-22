import { PlantGrowthLogDTOFactory } from './plant-growth-log.dto.factory'
import { MeasurementGrowthLogDTO } from './measurement-growth-log.dto'
import { NutrientGrowthLogDTO } from './nutrient-growth-log.dto'
import { PestGrowthLogDTO } from './pest-growth-log.dto'
import { TrainingGrowthLogDTO } from './training-growth-log.dto'
import { TreatmentGrowthLogDTO } from './treatment-growth-log.dto'

describe('PlantGrowthLogDTOFactory', () => {
  const base = {
    plantId: 'plant-1',
    date: new Date(),
    notes: 'note',
  }

  it('should create Measurement DTO', () => {
    const dto: any = {
      ...base,
      type: 'MEASUREMENT',
      measurementLog: { height: 10 },
    }

    const result = PlantGrowthLogDTOFactory.createFromDTO(dto)

    expect(result).toBeInstanceOf(MeasurementGrowthLogDTO)
    expect((result as any).measurement).toEqual({ height: 10 })
    expect(result.type).toBe('MEASUREMENT')
  })

  it('should create Nutrient DTO', () => {
    const dto: any = {
      ...base,
      type: 'NUTRIENTS',
      nutrientLog: { ph: 6.5 },
    }

    const result = PlantGrowthLogDTOFactory.createFromDTO(dto)

    expect(result).toBeInstanceOf(NutrientGrowthLogDTO)
    expect((result as any).nutrient).toEqual({ ph: 6.5 })
    expect(result.type).toBe('NUTRIENTS')
  })

  it('should create Pest DTO', () => {
    const dto: any = {
      ...base,
      type: 'PEST_ISSUE',
      pestLog: { type: 'mites' },
    }

    const result = PlantGrowthLogDTOFactory.createFromDTO(dto)

    expect(result).toBeInstanceOf(PestGrowthLogDTO)
    expect((result as any).pest).toEqual({ type: 'mites' })
    expect(result.type).toBe('PEST_ISSUE')
  })

  it('should create Training DTO', () => {
    const dto: any = {
      ...base,
      type: 'TRAINING',
      trainingLog: { method: 'LST' },
    }

    const result = PlantGrowthLogDTOFactory.createFromDTO(dto)

    expect(result).toBeInstanceOf(TrainingGrowthLogDTO)
    expect((result as any).training).toEqual({ method: 'LST' })
    expect(result.type).toBe('TRAINING')
  })

  it('should create Treatment DTO', () => {
    const dto: any = {
      ...base,
      type: 'SPECIAL_TREATMENT',
      treatmentLog: { product: 'Neem' },
    }

    const result = PlantGrowthLogDTOFactory.createFromDTO(dto)

    expect(result).toBeInstanceOf(TreatmentGrowthLogDTO)
    expect((result as any).treatment).toEqual({ product: 'Neem' })
    expect(result.type).toBe('SPECIAL_TREATMENT')
  })

  it('should throw error for unsupported type', () => {
    const dto: any = {
      ...base,
      type: 'UNKNOWN',
    }

    expect(() => PlantGrowthLogDTOFactory.createFromDTO(dto)).toThrow(
      'Unsupported growth log type',
    )
  })
})
