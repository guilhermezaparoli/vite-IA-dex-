import { Link } from "@tanstack/react-router"
import { useAuthenticateContext } from "../../context/authenticate"
import { Avatar } from "../Avatar"

export function Header() {
    const { isAuthenticate } = useAuthenticateContext()
    return (
        <header className="w-full flex justify-between items-center text-white p-4">
            <Link to="/" className="text-2xl font-bold">AI dex</Link>
            <nav className="flex items-center gap-4">
                <ul className="flex gap-3 justify-center items-center">
                    {isAuthenticate ? (
                        <Avatar />
                    ) : ( 
                        <Link to="/login" className="[&.active]:text-blue-500 hover:underline">
                            Login
                        </Link>
                    )}
                   
                </ul>
            </nav>
        </header>
    )
}