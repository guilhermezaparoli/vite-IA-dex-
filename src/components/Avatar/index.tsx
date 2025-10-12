import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuthenticateContext } from "../../context/authenticate";
import { useTranslation } from "react-i18next";

export function Avatar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuthenticateContext();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
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

    if (!user) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#060B28] cursor-pointer"
            >
                <span className="text-sm">{getInitials(user.name)}</span>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#24293f] border border-gray-600 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-600">
                        <p className="text-sm text-white font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{t('profile.welcome')}</p>
                    </div>

                    <div className="py-1">
                        <Link
                            to="/profile"
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {t('header.profile')}
                            </div>
                        </Link>

                        <Link
                            to="/my-monsters"
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                {t('header.myMonsters')}
                            </div>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2 cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t('header.logout')}
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}