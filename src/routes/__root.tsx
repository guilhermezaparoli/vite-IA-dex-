import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '../components/Header';
import AuthenticateProvider from '../context/authenticate';
import { NotFound } from '../pages/notFound';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error, reset }) => (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-red-600">
      <h1>Ops, alguma coisa deu errado!</h1>
      <pre>{error.message}</pre>
      <button
        onClick={() => reset()}
        className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        Tentar novamente
      </button>
    </div>
  ),
});

function RootComponent() {
  return (
    <>
      <AuthenticateProvider>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </AuthenticateProvider>
    </>
  );
}
