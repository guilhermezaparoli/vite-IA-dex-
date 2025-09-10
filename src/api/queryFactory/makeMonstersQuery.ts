import { fetchAllMonsters, type Monster, type MonstersResponse } from "../fetchAllMonsters";
import { fetchMonsterById } from "../fetchMonsterById";

interface IMonsterQueries {
    all: () => string[];
    allPaginated: (page: number, pageSize: number, search?: string) => {
        queryKey: (string | { page: number; pageSize: number; search?: string | undefined; })[];
        queryFn: () => Promise<MonstersResponse>;
    };
    byId: (id: string) => {
        queryKey: (string | string)[];
        queryFn: () => Promise<Monster>;
    };
}

export const makeMonstersQuery: IMonsterQueries = {
    all: () => ['monsters'],
    allPaginated: (page: number, pageSize: number, search?: string) => (
        {
            queryKey: [...makeMonstersQuery.all(), { page, pageSize, search }],
            queryFn: () => fetchAllMonsters({ page, pageSize, search })
        }
    ),
    byId: (id: string) => (
        {
            queryKey: [...makeMonstersQuery.all(), id],
            queryFn: () => fetchMonsterById(id)
        }
    )
}