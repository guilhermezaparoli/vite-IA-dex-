import { api } from "./axios/api";
import type { Monster } from "./queries/useFetchAllMonsters";



interface Pagination {
    totalItems: number;
    page: number;
    pageSize: number;
}
export interface MonstersResponse {
    monsters: Monster[];
    pagination: Pagination;
}

export interface MonstersParams {
    page: number;
    pageSize: number;
    search?: string;
}

export async function fetchAllMonsters({ page, pageSize, search }: MonstersParams) {
    const { data } = await api.get<MonstersResponse>('/monsters', {
        params: { page, pageSize, search }
    })

    return data
}