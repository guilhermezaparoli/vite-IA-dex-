import { api } from "./axios/api";

export async function fetchUser() {
    const { data } = await api.get('/me');

    return data
}