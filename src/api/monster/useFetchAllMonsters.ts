import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from ".."
import { useEffect } from "react";


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
    page: number;
    pageSize: number;
    search?: string;
}

function fetchAllMonstersOptions({ page, pageSize, search }: MonstersParams) {
    return {
        queryKey: ['monsters', { page, pageSize, search }],
        queryFn: async () => {
            const { data } = await api.get<MonstersResponse>('/monsters', {
                params: { page, pageSize, search }
            })
            return data
        }
    }
}

export const useFetchAllMonsters = (params: MonstersParams) => {

    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.prefetchQuery(fetchAllMonstersOptions({
            page: params.page + 1,
            pageSize: params.pageSize,
            search: params.search
        }))
    }, [params, queryClient])
    return useQuery({
        ...fetchAllMonstersOptions(params)
    })
}