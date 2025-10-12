import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Home } from '../../pages/home';

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-xl text-white">Carregando monstros...</div>
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}
