import { fetchAllMonsters, type MonstersResponse } from "../fetchAllMonsters";

interface IMonsterQueries {
    all: () => string[];
    allPaginated: (page: number, pageSize: number, search?: string) => {
        queryKey: (string | { page: number; pageSize: number; search?: string | undefined; })[];
        queryFn: () => Promise<MonstersResponse>;
    };
}

export const makeMonstersQuery: IMonsterQueries = {
    all: () => ['monsters'],
    allPaginated: (page: number, pageSize: number, search?: string) => (
        {
            queryKey: ['monsters', { page, pageSize, search }],
            queryFn: () => fetchAllMonsters({ page, pageSize, search })
        }
    ),
}