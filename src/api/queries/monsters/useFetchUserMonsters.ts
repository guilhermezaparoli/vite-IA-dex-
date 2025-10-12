import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { MonsterType } from "../../../@types/monster";
import { makeMonstersQuery } from "../queryFactory/makeMonstersQuery";

export interface UserMonstersParams {
  page: number;
  pageSize: number;
  types?: MonsterType[] | null;
  search?: string;
}

export const useFetchUserMonsters = (params: UserMonstersParams) => {
  const { page, pageSize, types, search } = params;

  const queryClient = useQueryClient();
  useEffect(() => {
    const nextQuery = makeMonstersQuery.userMonsters(
      page + 1,
      pageSize,
      types,
      search,
    );

    queryClient.prefetchQuery(nextQuery);
  }, [page, pageSize, types, queryClient, search]);

  return useQuery(
    makeMonstersQuery.userMonsters(page, pageSize, types, search),
  );
};
