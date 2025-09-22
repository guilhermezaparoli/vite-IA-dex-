import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CardMonster } from "../../components/CardMonster";
import { LabelType } from "../../components/LabelType";
import { useFetchAllMonsters } from "../../api/queries/monsters/useFetchAllMonsters";
import { Pagination } from "../../components/Pagination";
import type { MonsterType } from "../../@types/monster";
import { monsterTypes } from "../../constants/monsterTypes";

export function Home() {

    const [selectedType, setSelectedType] = useState<MonsterType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: monstersData } = useFetchAllMonsters({
        page: currentPage,
        pageSize: 10,
        types: selectedType
    })

    const handleTypeClick = (type: MonsterType) => {
        
        if (selectedType?.includes(type)) {
            setSelectedType(selectedType.filter(t => t !== type));
            return;
        }
        
        if (selectedType.length >= 2) {
            return
        }


        setSelectedType([...selectedType, type]);
    };


    const { monsters, pagination } = monstersData;
    const { totalItems, pageSize } = pagination;
    console.log(monstersData);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        const element = document.querySelector('#monsters-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

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
                    {monsterTypes.map((type) => (
                        <LabelType monsterType={type} onClick={() => handleTypeClick(type)} selected={selectedType?.includes(type)} />
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 mt-10">

                {monsters?.map((monster) => (
                    <CardMonster key={monster.id} monster={monster} />
                ))}

            </section>

            <Pagination currentPage={currentPage} totalPages={Math.ceil(totalItems / pageSize)} onPageChange={handlePageChange} itemsPerPage={pageSize} totalItems={totalItems} />
        </main>
    )
}