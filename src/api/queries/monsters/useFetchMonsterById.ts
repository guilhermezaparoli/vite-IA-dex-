import { useSuspenseQuery } from "@tanstack/react-query";
import { makeMonstersQuery } from "../queryFactory/makeMonstersQuery";

export const useFetchMonsterById = (id: string) => {
  return useSuspenseQuery(makeMonstersQuery.byId(id));
};
