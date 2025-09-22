import type { MonsterType } from "../../../@types/monster";
import { fetchAllMonsters } from "../../fetchAllMonsters";
import { fetchMonsterById } from "../../fetchMonsterById";


export const makeMonstersQuery = {
    all: () => ['monsters'] as const,
    allPaginated: (page: number, pageSize: number, types?: MonsterType[] | null, search?: string) => (
        {
            queryKey: [...makeMonstersQuery.all(), "list", { page, pageSize, types, search }],
            queryFn: () => fetchAllMonsters({ page, pageSize, types, search })
        }
    ) as const,
    byId: (id: string) => (     
        {
            queryKey: [...makeMonstersQuery.all(), "detail", id],
            queryFn: () => fetchMonsterById(id)
        }
    ) as const
}

