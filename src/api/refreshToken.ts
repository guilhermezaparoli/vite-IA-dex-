import { api } from "./axios/api";

export async function refreshToken(token?: string) {
  return await api.patch("/token/refresh", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
