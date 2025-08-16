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

export interface MonstersResponse {
    monsters: Monster[];
    total: number;
    page: number;
    pageSize: number;
}

export const useFetchAllMonsters = () => {
    return useQuery({
        queryKey: ['monsters'],
        queryFn: () => api.get<MonstersResponse>('/monsters', {
                params: {
                    page: 3,
                    pageSize: 10
                }
            }),
    })
}