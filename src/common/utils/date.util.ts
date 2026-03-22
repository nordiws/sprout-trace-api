export function calculateCurrentWeek(plantedDate: Date): number {
    const now = Date.now()
    const plantedTime = plantedDate.getTime()

    if (plantedTime > now) {
        return 0 // Not planted yet
    }

    const weeks = Math.floor((now - plantedTime) / (7 * 24 * 60 * 60 * 1000)) + 1
    return weeks
}

export function calculateAgeInDays(date: Date): number {
    const now = Date.now()
    const plantedTime = date.getTime()

    if (plantedTime > now) {
        return 0
    }
    return Math.floor((now - plantedTime) / (24 * 60 * 60 * 1000))
}