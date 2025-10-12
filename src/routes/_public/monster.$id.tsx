import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { MonsterDetails } from '../../pages/monsterDetails';

export const Route = createFileRoute('/_public/monster/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-xl text-white">Carregando detalhes do monstro...</div>
        </div>
      }
    >
      <MonsterDetails monsterId={id} />
    </Suspense>
  );
}
