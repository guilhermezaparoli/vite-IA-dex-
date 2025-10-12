import { api } from './axios/api';

interface AuthenticateRequestBody {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  token: string;
}
export function authenticate(body: AuthenticateRequestBody) {
  return api.post<AuthenticateResponse>('/auth', body);
}
