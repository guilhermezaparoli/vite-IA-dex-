import { api } from "./axios/api";

export async function fetchAllTypes() {
    const { data } = await api('/types');

    return data;
}
