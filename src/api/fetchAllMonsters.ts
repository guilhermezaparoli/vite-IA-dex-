import { api } from "./axios/api";

export interface Monster {
    id: string;
    name: string;
    description: string;
    story: string;
    image: string;
    created_at: string;
    user_id: string;
    type_id: number;
    user: {
        name: string
    }
}


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