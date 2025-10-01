import { api } from "./axios/api";

export interface User {
    name: string;
    email: string;
    createdAt: Date
}

interface FetchUserResponse {
    user: User;
}

export async function fetchUser() {
    const { data } = await api.get<FetchUserResponse>('/me');

    return data.user
}