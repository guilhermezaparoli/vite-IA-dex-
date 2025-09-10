import { fetchAllTypes } from "../fetchAllTypes";

export const makeTypesQuery = {
    all: () => ['types'],
    allFetch: () => ({
        queryKey: makeTypesQuery.all(),
        queryFn: () => fetchAllTypes()
    })
}