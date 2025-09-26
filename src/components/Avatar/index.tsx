import { useState, useRef, useEffect } from "react";
import { useAuthenticateContext } from "../../context/authenticate";

interface AvatarProps {
    username?: string;
    avatarUrl?: string;
}

export function Avatar({ username = "Usuário", avatarUrl }: AvatarProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuthenticateContext();

    const handleLogout = () => {
        logout()
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#060B28]"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={username}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-sm">{getInitials(username)}</span>
                )}
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#24293f] border border-gray-600 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-600">
                        <p className="text-sm text-white font-medium">{username}</p>
                        <p className="text-xs text-gray-400">Bem-vindo ao AI Dex</p>
                    </div>
                    
                    <div className="py-1">
                        <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Ver Perfil
                            </div>
                        </button>
                        
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sair
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}