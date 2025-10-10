import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Home } from '../../pages/home'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando monstros...</div>
      </div>
    }>
      <Home/>
    </Suspense>
  )
}
