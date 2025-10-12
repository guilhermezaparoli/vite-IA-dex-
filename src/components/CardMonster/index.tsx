import type { Monster } from "../../api/queries/monsters/useFetchAllMonsters";
import { LabelType } from "../LabelType";
import { RarityBadge } from "../RarityBadge";
import { Link } from "@tanstack/react-router";
import { getRarityConfig } from "../../utils/rarity";
import { useTranslation } from "react-i18next";

interface CardMonsterProps {
    monster: Monster
}
export function CardMonster({ monster }: CardMonsterProps) {
    const rarityConfig = getRarityConfig(monster);
    const { t } = useTranslation();
    
    return (
        <div 
            className={`max-w-72 mx-auto flex items-center flex-col space-y-4 border-2 rounded-3xl overflow-hidden relative transition-all duration-300 hover:scale-105 ${
                rarityConfig.level === 'legendary' ? 'rarity-legendary' : ''
            }`}
            style={{
                borderColor: rarityConfig.borderColor,
                boxShadow: `0 0 20px ${rarityConfig.glowColor}, inset 0 0 20px ${rarityConfig.glowColor}`
            }}
        >
            <div className="absolute top-2 right-2 z-10">
                <RarityBadge monster={monster} />
            </div>
            
            <img src={monster.image} alt="Monster" className="w-full rounded-t-2xl" />

            <div className="flex flex-col items-center text-center gap-3 text-white px-4 h-full">
                <p>{t('monster.id', { id: monster.id })}</p>
                <h2 className="text-2xl font-bold">{monster.name}</h2>
                <div className="flex items-center gap-2">
                    {monster.types.map((type) => (
                        <LabelType key={type} monsterType={type} selected className="!cursor-default" />
                    ))}
                </div>

                <p className="text-gray-400 text-sm">{t('monster.createdBy', { name: monster.user.name })}</p>

                <div className="flex items-center gap-1 text-xs">
                    <span className="text-gray-300">{t('monster.totalStats')}</span>
                    <span
                        className="font-bold"
                        style={{ color: rarityConfig.color }}
                    >
                        {monster.hp + monster.attack + monster.defense + monster.speed + monster.special_attack + monster.special_defense}
                    </span>
                </div>
            </div>

            <Link
                to="/monster/$id"
                params={{ id: monster.id }}
                className="px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center block"
            >
                {t('monster.moreDetails')}
            </Link>
        </div>
    )
}