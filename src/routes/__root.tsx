import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '../components/Header'
import AuthenticateProvider from '../context/authenticate'

export const Route = createRootRoute({
    component: RootComponent,
    errorComponent: ({ error, reset }) => (
        <div className='flex flex-col items-center h-screen justify-center p-4 text-red-600'>
            <h1>Ops, alguma coisa deu errado!</h1>
            <pre>{error.message}</pre>
            <button onClick={() => reset()} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
                Tentar novamente
            </button>
        </div>
    )
})

function RootComponent() {
    return (
        <>
            <AuthenticateProvider>
                <Header />
                <Outlet />
                <TanStackRouterDevtools />
            </AuthenticateProvider>
        </>
    )
}
