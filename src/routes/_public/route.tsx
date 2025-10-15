import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useAuthenticateContext } from '../../context/authenticate';
import { useEffect } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  const { isAuthenticate } = useAuthenticateContext();
  const navigate = Route.useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se estiver autenticado e tentar acessar login ou register, redireciona para home
    if (isAuthenticate && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate({ to: '/', replace: true });
    }
  }, [isAuthenticate, location.pathname, navigate]);

  return <Outlet />;
}
