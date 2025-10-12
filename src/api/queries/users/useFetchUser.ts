import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../fetchUser';

export function useFetchUser(token: string | null) {
  return useQuery({
    queryKey: ['user', 'details'],
    queryFn: fetchUser,
    enabled: !!token,
  });
}
