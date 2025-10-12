import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../logoutUser';

export function useLogoutUser() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
