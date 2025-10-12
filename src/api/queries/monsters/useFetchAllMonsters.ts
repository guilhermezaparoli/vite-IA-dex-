import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { MonsterType } from "../../../@types/monster";
import { makeMonstersQuery } from "../queryFactory/makeMonstersQuery";

export interface Monster {
  id: string;
  name: string;
  description: string;
  story: string;
  image: string;
  created_at: string;
  user_id: string;
  user: {
    name: string;
  };

  hp: number;
  attack: number;
  defense: number;
  speed: number;
  special_attack: number;
  special_defense: number;
  types: MonsterType[];
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
  types?: MonsterType[] | null;
  search?: string;
}

export const useFetchAllMonsters = (params: MonstersParams) => {
  const { page, pageSize, types, search } = params;

  const queryClient = useQueryClient();
  useEffect(() => {
    const nextQuery = makeMonstersQuery.allPaginated(
      page + 1,
      pageSize,
      types,
      search,
    );

    queryClient.prefetchQuery(nextQuery);
  }, [page, pageSize, types, queryClient, search]);

  return useQuery(
    makeMonstersQuery.allPaginated(page, pageSize, types, search),
  );
};
