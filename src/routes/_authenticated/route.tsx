import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useAuthenticateContext } from '../../context/authenticate'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const { isAuthenticate } = useAuthenticateContext()
  const navigate = Route.useNavigate()

  if (!isAuthenticate) {
    navigate({ to: '/login' })
    return null
  }

  return <Outlet />
}
