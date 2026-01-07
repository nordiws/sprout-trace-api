export class PaginationDTO {
    page: number
    limit: number
    total: number

    static mapper(page: number, limit: number, total: number): PaginationDTO {
        return {
            page,
            limit,
            total
        }
    }

}