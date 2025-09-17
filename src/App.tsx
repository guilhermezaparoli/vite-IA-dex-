import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { Suspense } from "react"
import { ToastContainer } from "react-toastify"

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
        }
    }
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-900">
                    <div className="text-white text-xl">Carregando aplicação...</div>
                </div>
            }>
                <RouterProvider router={router} />
            </Suspense>
            <ToastContainer />
        </QueryClientProvider>
    )
}