import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Suspense } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      throwOnError(_error, query) {
        return typeof query.state.data === 'undefined';
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.state.data !== 'undefined') {
        toast.error(error.message);
      }
    },
  }),
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="text-xl text-white">Carregando aplicação...</div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
    </QueryClientProvider>
  );
}
