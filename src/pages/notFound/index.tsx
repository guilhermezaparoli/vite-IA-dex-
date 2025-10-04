import { Link } from "@tanstack/react-router";
import { Home, Search, ArrowLeft } from "lucide-react";

export function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-2xl space-y-8 text-center">
                
                <div className="relative">
                    <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Página não encontrada
                    </h2>
                    <p className="text-lg text-gray-400 max-w-md mx-auto">
                        Parece que este monstro fugiu! A página que você está procurando não existe ou foi movida.
                    </p>
                </div>

                <div className="text-6xl md:text-8xl my-8 opacity-50">
                    👾
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Link 
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 shadow-lg  cursor-pointer"
                    >
                        <Home className="w-5 h-5" />
                        Voltar para Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </button>
                </div>

                <div className="mt-12 p-6 bg-[#24293f] border border-gray-600 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" />
                        O que você pode fazer?
                    </h3>
                    <ul className="space-y-3 text-left text-gray-300 max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500 ">•</span>
                            <span>Verifique se o endereço foi digitado corretamente</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500 ">•</span>
                            <span>Volte para a página inicial e navegue a partir dela</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500 ">•</span>
                            <span>Explore nossa coleção de monstros criados por IA</span>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
    );
}
