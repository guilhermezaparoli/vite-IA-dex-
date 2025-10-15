import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useAuthenticateContext } from '../../context/authenticate';
import { useEffect } from 'react';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticate } = useAuthenticateContext();
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate({ to: '/login', replace: true });
    }
  }, [isAuthenticate, navigate]);

  if (!isAuthenticate) {
    return null;
  }

  return <Outlet />;
}
