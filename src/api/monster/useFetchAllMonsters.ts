import { useQuery } from "@tanstack/react-query"
import { api } from ".."


export interface Monster {
    id: string;
    name: string;
    description: string;
    story: string;
    image: string;
    created_at: string;
    user_id: string;
    type_id: number;
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
    page?: number;
    pageSize?: number;
    search?: string;
}

export const useFetchAllMonsters = (params: MonstersParams) => {
    return useQuery({
        queryKey: ['monsters', params],
        queryFn: async () => {
            const { data } = await api.get<MonstersResponse>('/monsters', {
                params
            })
            return data
        },
    })
}