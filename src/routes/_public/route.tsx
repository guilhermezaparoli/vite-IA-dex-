import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useAuthenticateContext } from '../../context/authenticate';
import { useEffect } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  const { isAuthenticate } = useAuthenticateContext();
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (isAuthenticate) {
      navigate({ to: '/' });
    }
  }, [isAuthenticate, navigate]);

  return <Outlet />;
}
