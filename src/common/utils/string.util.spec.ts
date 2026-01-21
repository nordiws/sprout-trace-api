jest.mock('crypto', () => ({
  randomInt: jest.fn(),
}))

import { generateCode } from './string.util'
import { EntityCodePrefix } from '../enums/entity-code-prefix.enum'
import { randomInt } from 'crypto'

describe('generateCode', () => {
  const fixedDate = new Date(Date.UTC(2025, 0, 9)) // 2025-01-09 UTC

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(fixedDate)
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('should generate code with default HARVEST prefix', () => {
    ;(randomInt as jest.Mock).mockReturnValue(42)

    const result = generateCode()

    expect(result).toBe('HV-20250109-000042')
  })

  it('should generate code with provided prefix', () => {
    ;(randomInt as jest.Mock).mockReturnValue(123456)

    const result = generateCode(EntityCodePrefix.PLANT)

    expect(result).toBe('PL-20250109-123456')
  })

  it('should always generate a 6-digit random segment', () => {
    ;(randomInt as jest.Mock).mockReturnValue(7)

    const result = generateCode(EntityCodePrefix.SEED)

    const randomPart = result.split('-')[2]
    expect(randomPart).toHaveLength(6)
    expect(randomPart).toBe('000007')
  })
})
