import { randomInt } from 'crypto'
import { EntityCodePrefix } from '../enums/entity-code-prefix.enum'

function pad(value: number, length: number): string {
  return value.toString().padStart(length, '0')
}

export function generateCode(
  prefix: EntityCodePrefix = EntityCodePrefix.HARVEST,
): string {
  const now = new Date()

  const date =
    now.getUTCFullYear().toString() +
    pad(now.getUTCMonth() + 1, 2) +
    pad(now.getUTCDate(), 2)

  const random = pad(randomInt(0, 1_000_000), 6)

  return `${prefix}-${date}-${random}`
}
