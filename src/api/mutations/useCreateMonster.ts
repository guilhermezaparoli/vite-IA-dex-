import { useMutation } from "@tanstack/react-query";
import type { MonsterType } from "../../@types/monster";
import { api } from "../axios/api";

interface CreateMonsterRequest {
    name: string;
    description: string;
    story: string;
    types: MonsterType[]
}


function createMonster(body: CreateMonsterRequest) {
    return api.post('/monsters/create', body)
}

export function useCreateMonster() {
    return useMutation({
        mutationFn: createMonster
    })
}