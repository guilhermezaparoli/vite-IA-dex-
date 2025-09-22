import { Link } from "@tanstack/react-router"

export function Header() {
    return (
        <header className="w-full flex justify-between items-center text-white p-4">
            <h1 className="text-2xl font-bold">AI dex</h1>
            <nav>
                <ul className="flex gap-3">
                    <Link to="/" className="[&.active]:text-blue-500 hover:underline">
                        Home
                    </Link>
                    {/* <Link to="/contact" className="text-blue-500 hover:underline">
                        Login
                    </Link> */}
                </ul>
            </nav>
        </header>
    )
}