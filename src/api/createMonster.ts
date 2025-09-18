import type { MonsterType } from "../@types/monster";
import { api } from "./axios/api";

interface CreateMonsterRequest {
    name: string;
    description: string;
    story: string;
    types: MonsterType[]
}

interface CreateMonsterResponse {
    id: number
}


export async function createMonster(body: CreateMonsterRequest) {
    const { data } = await api.post<CreateMonsterResponse>('/monsters/create', body)
    return data
}