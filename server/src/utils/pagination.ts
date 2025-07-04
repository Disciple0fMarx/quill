interface PaginationOptions {
    page?: number
    limit?: number
}

interface Pagination {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
}

interface PaginationResult<T> {
    data: T
    pagination: Pagination
}

export const paginate = async <T>(
    model: any,
    findManyArgs: any,
    options: PaginationOptions = {},
): Promise<PaginationResult<T>> => {
    const page = options.page || 1
    const limit = options.limit || 10
    const skip = (page - 1) * limit

    const [total, data] = await Promise.all([
        model.count({ where: findManyArgs.where }),
        model.findMany({
            ...findManyArgs,
            skip,
            take: limit,
        }),
    ])

    return {
        data,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit,
        },
    }
}
