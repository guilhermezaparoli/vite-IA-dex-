import { Link } from "@tanstack/react-router";
import { CardMonster } from "../../components/CardMonster";
import { LabelType } from "../../components/LabelType";

export function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">

            <section className="flex justify-center items-center flex-col space-y-4 p-4">
                <h1 className="text-3xl font-bold text-white">Bem vindo ao AI Dex</h1>
                <p className="text-gray-400">Explore o mundo dos monstros gerados por IA</p>
            </section>

            <Link to="/create-monster" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Crie seu próprio monstro
            </Link>

            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Register to create your own monsters
            </button> */}

            <div className="relative m-8">
                <input 
                    type="text" 
                    className="p-2 pr-10 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent" 
                    placeholder="Pesquise seu monstro" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <section className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold text-white ">Encontre pelo tipo:</h2>
                <div className="flex flex-wrap justify-center items-center gap-4 p-4">
                    <LabelType type="normal"  />
                    <LabelType type="fire" />
                    <LabelType type="water" />
                    <LabelType type="electric" />
                    <LabelType type="grass" />
                    <LabelType type="ice" />
                    <LabelType type="fighting" />
                    <LabelType type="poison" />
                    <LabelType type="ground" />
                    <LabelType type="flying" />
                    <LabelType type="psychic" />
                    <LabelType type="bug" />
                    <LabelType type="rock" />
                    <LabelType type="ghost" />
                    <LabelType type="dragon" />
                    <LabelType type="dark" />
                    <LabelType type="steel" />
                    <LabelType type="fairy" />
                </div>
            </section>





            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-10">
                <CardMonster />
                <CardMonster />
                <CardMonster />
                <CardMonster />
                <CardMonster />
                <CardMonster />
                <CardMonster />

            </section>
        </main>
    )
}