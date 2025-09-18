import { api } from "./axios/api";
import type { Monster } from "./queries/monsters/useFetchAllMonsters";

interface MonsterResponse {
    monster: Monster;
}

export async function fetchMonsterById (id: string) {
    const { data } = await api.get<MonsterResponse>(`/monster/${id}`)

    return data.monster
};
