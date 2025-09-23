import { Link } from "@tanstack/react-router"
import { useAuthenticateContext } from "../../context/authenticate"

export function Header() {
    const { isAuthenticate } = useAuthenticateContext()
    return (
        <header className="w-full flex justify-between items-center text-white p-4">
            <Link to="/" className="text-2xl font-bold">AI dex</Link>
            <nav>
                <ul className="flex gap-3">
                    <Link to="/" className="[&.active]:text-blue-500 hover:underline">
                        Home
                    </Link>

                    {isAuthenticate ? (<div>Logado</div>) : ( <Link to="/login" className="[&.active]:text-blue-500 hover:underline">
                        Login
                    </Link>)}
                   
                </ul>
            </nav>
        </header>
    )
}