import { api } from "..";

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

export async function fetchAllMonsters(): Promise<Monster[]> {
    const { data } = await api.get<Monster[]>('/monsters', {
        params: {
            page: 3,
            pageSize: 10
        }
    });
    return data;
}