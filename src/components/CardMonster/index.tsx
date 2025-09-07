import type { Monster } from "../../api/queries/useFetchAllMonsters";
import { LabelType } from "../LabelType";

interface CardMonsterProps {
    monster: Monster
}
export function CardMonster({ monster }: CardMonsterProps) {
    
    return (
        <div className="max-w-72 mx-auto flex items-center flex-col space-y-4 border border-slate-800 rounded-3xl overflow-hidden">
            <img src={monster.image} alt="Monster" className="w-full rounded-t-2xl" />

            <div className="flex flex-col items-center text-center gap-3 text-white">
                <p>#{monster.id}</p>
                <h2 className="text-2xl font-bold">{monster.name}</h2>
                <div className="flex items-center gap-2">
                    <LabelType monsterType="dragon" selected className="!cursor-default" />
                    <LabelType monsterType="fairy" selected className="!cursor-default" />
                </div>

                <p className="text-gray-400 text-sm">created by [Your Name]</p>

            </div>

            <button className=" px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600">
                More details
            </button>
        </div>
    )
}