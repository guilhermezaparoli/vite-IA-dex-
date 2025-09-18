import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { makeMonstersQuery } from "../queryFactory/makeMonstersQuery";
import type { MonsterType } from "../../../@types/monster";


export interface Monster {
    id: string;
    name: string;
    description: string;
    story: string;
    image: string;
    created_at: string;
    user_id: string;
    user: {
        name: string
    }
    
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    special_attack: number;
    special_defense: number;
    types: MonsterType[]
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

export const useFetchAllMonsters = (params: MonstersParams) => {

    const { page, pageSize, search } = params
    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.prefetchQuery(makeMonstersQuery.allPaginated(page + 1, pageSize, search))
    }, [page, pageSize, search, queryClient])


    return useSuspenseQuery(makeMonstersQuery.allPaginated(page, pageSize, search))
}