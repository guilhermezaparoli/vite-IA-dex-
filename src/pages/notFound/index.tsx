import { Link } from '@tanstack/react-router';
import { Home, Search, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="relative">
          <h1 className="animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-9xl font-bold text-transparent md:text-[200px]">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Página não encontrada</h2>
          <p className="mx-auto max-w-md text-lg text-gray-400">
            Parece que este monstro fugiu! A página que você está procurando não existe ou foi
            movida.
          </p>
        </div>

        <div className="my-8 text-6xl opacity-50 md:text-8xl">👾</div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-600"
          >
            <Home className="h-5 w-5" />
            Voltar para Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-700 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>
        </div>

        <div className="mt-12 rounded-lg border border-gray-600 bg-[#24293f] p-6">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold text-white">
            <Search className="h-5 w-5" />O que você pode fazer?
          </h3>
          <ul className="mx-auto max-w-md space-y-3 text-left text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Verifique se o endereço foi digitado corretamente</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Volte para a página inicial e navegue a partir dela</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Explore nossa coleção de monstros criados por IA</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
