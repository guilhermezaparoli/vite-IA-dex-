import { Link } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { CardMonster } from "../../components/CardMonster";
import { LabelType } from "../../components/LabelType";
import { useFetchAllMonsters, type Monster } from "../../api/queries/monsters/useFetchAllMonsters";
import { Pagination } from "../../components/Pagination";
import type { MonsterType } from "../../@types/monster";
import { monsterTypes } from "../../constants/monsterTypes";
import { useDebounce } from "../../hooks/useDebounce";
import { useAuthenticateContext } from "../../context/authenticate";

export function Home() {

    const [selectedType, setSelectedType] = useState<MonsterType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce(search, 300)
    const { isAuthenticate } = useAuthenticateContext()

    const { data: monstersData, isLoading } = useFetchAllMonsters({
        page: currentPage,
        pageSize: 8,
        types: selectedType,
        search: debouncedSearch
    })

    const monsters = monstersData?.monsters || [];
    const pagination = monstersData?.pagination || {
        totalItems: 0,
        pageSize: 8,
        currentPage: 1,
        totalPages: 0
    };


    const handleTypeClick = (type: MonsterType) => {

        if (selectedType?.includes(type)) {
            setSelectedType(selectedType.filter(t => t !== type));
            setCurrentPage(1)
            return;
        }

        if (selectedType.length >= 2) {
            return
        }


        setSelectedType([...selectedType, type]);
        setCurrentPage(1)

    };


    const onHandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearch(value)
        setCurrentPage(1)
    }



    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        const element = document.querySelector('#monsters-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }


    return (
        <main className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">

            <section className="flex justify-center items-center flex-col space-y-4 p-4">
                <h1 className="text-3xl font-bold text-white">Bem vindo ao AI Dex</h1>
                <p className="text-gray-400">Explore o mundo dos monstros gerados por IA</p>
            </section>

            {isAuthenticate ? (<Link to="/create-monster" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Criar monstro
            </Link>) : (<>
            <Link to="/register" className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600">
                Registre-se
            </Link>
            </>)}




            <div className="relative m-8">
                <input
                    type="text"
                    className="p-2 pr-10 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent"
                    placeholder="Pesquise seu monstro"
                    value={search}
                    onChange={onHandleSearch}
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

            {isLoading ? <div className="flex items-center justify-center text-white text-xl mt-20">Carregando...</div> : (<>

                <section id="monsters-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 mt-10">

                    {monsters?.map((monster: Monster) => (
                        <CardMonster key={monster.id} monster={monster} />
                    ))}


                </section>
                {monsters.length === 0 && (
                    <div className="flex items-center justify-center text-white text-xl">Nenhum monstro encontrado</div>
                )}

                <Pagination currentPage={currentPage} totalPages={Math.ceil(pagination.totalItems / pagination.pageSize)} onPageChange={handlePageChange} itemsPerPage={pagination.pageSize} totalItems={pagination.totalItems} />

            </>)}

        </main>
    )
}