import { api } from "./axios/api";

interface ChangePasswordRequestBody {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}

export function changePassword(body: ChangePasswordRequestBody) {
  return api.patch<ChangePasswordResponse>("/change-password", body);
}
