import { createFileRoute } from '@tanstack/react-router'
import { CreateMonster } from '../pages/createMonster'

export const Route = createFileRoute('/create-monster')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateMonster/>
}
