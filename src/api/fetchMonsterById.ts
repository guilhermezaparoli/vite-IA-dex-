import { api } from "./axios/api";
import type { Monster } from "./queries/useFetchAllMonsters";

interface MonsterResponse {
    monster: Monster;
}

export const fetchMonsterById = async (id: string) => {
    const { data } = await api.get<MonsterResponse>(`/monster/${id}`)

    return data.monster
};
