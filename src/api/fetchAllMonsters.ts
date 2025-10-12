import type { MonsterType } from "../@types/monster";
import { api } from "./axios/api";
import type { Monster } from "./queries/monsters/useFetchAllMonsters";
import qs from "qs";

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

export async function fetchAllMonsters({
  page,
  pageSize,
  types,
  search,
}: MonstersParams) {
  const { data } = await api.get<MonstersResponse>("/monsters", {
    params: { page, pageSize, types: types ?? undefined, search },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return data;
}
