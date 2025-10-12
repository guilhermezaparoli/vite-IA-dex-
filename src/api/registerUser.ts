import { api } from "./axios/api";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  token: string;
}

export const registerUser = async (data: RegisterUserRequest) => {
  const response = await api.post<RegisterUserResponse>("/register", data);
  return response.data;
};
