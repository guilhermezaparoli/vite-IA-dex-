import { fetchAllMonsters } from "../../fetchAllMonsters";
import { fetchMonsterById } from "../../fetchMonsterById";


export const makeMonstersQuery = {
    all: () => ['monsters'] as const,
    allPaginated: (page: number, pageSize: number, search?: string) => (
        {
            queryKey: [...makeMonstersQuery.all(), { page, pageSize, search }],
            queryFn: () => fetchAllMonsters({ page, pageSize, search })
        }
    ) as const,
    byId: (id: string) => (
        {
            queryKey: [...makeMonstersQuery.all(), id],
            queryFn: () => fetchMonsterById(id)
        }
    ) as const
}

