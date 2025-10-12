import { api } from "./axios/api";

export async function logoutUser() {
  const { data } = await api.post("/logout");

  return data;
}
