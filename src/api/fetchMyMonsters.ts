import type { MonsterType } from "../@types/monster";
import { api } from "./axios/api";
import type { Monster } from "./queries/monsters/useFetchAllMonsters";
import qs from "qs";

interface Pagination {
  totalItems: number;
  page: number;
  pageSize: number;
}
export interface MyMonstersResponse {
  monsters: Monster[];
  pagination: Pagination;
}

export interface MyMonstersParams {
  page: number;
  pageSize: number;
  types?: MonsterType[] | null;
  search?: string;
}

export async function fetchMyMonsters({
  page,
  pageSize,
  types,
  search,
}: MyMonstersParams) {
  const { data } = await api.get<MyMonstersResponse>("/monsters/me", {
    params: { page, pageSize, types: types ?? undefined, search },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return data;
}
