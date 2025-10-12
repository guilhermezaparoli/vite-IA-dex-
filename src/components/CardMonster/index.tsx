import type { Monster } from '../../api/queries/monsters/useFetchAllMonsters';
import { LabelType } from '../LabelType';
import { RarityBadge } from '../RarityBadge';
import { Link } from '@tanstack/react-router';
import { getRarityConfig } from '../../utils/rarity';
import { useTranslation } from 'react-i18next';

interface CardMonsterProps {
  monster: Monster;
}
export function CardMonster({ monster }: CardMonsterProps) {
  const rarityConfig = getRarityConfig(monster);
  const { t } = useTranslation();

  return (
    <div
      className={`relative mx-auto flex max-w-72 flex-col items-center space-y-4 overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:scale-105 ${
        rarityConfig.level === 'legendary' ? 'rarity-legendary' : ''
      }`}
      style={{
        borderColor: rarityConfig.borderColor,
        boxShadow: `0 0 20px ${rarityConfig.glowColor}, inset 0 0 20px ${rarityConfig.glowColor}`,
      }}
    >
      <div className="absolute top-2 right-2 z-10">
        <RarityBadge monster={monster} />
      </div>

      <img src={monster.image} alt="Monster" className="w-full rounded-t-2xl" />

      <div className="flex h-full flex-col items-center gap-3 px-4 text-center text-white">
        <p>{t('monster.id', { id: monster.id })}</p>
        <h2 className="text-2xl font-bold">{monster.name}</h2>
        <div className="flex items-center gap-2">
          {monster.types.map(type => (
            <LabelType key={type} monsterType={type} selected className="!cursor-default" />
          ))}
        </div>

        <p className="text-sm text-gray-400">
          {t('monster.createdBy', { name: monster.user.name })}
        </p>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-300">{t('monster.totalStats')}</span>
          <span className="font-bold" style={{ color: rarityConfig.color }}>
            {monster.hp +
              monster.attack +
              monster.defense +
              monster.speed +
              monster.special_attack +
              monster.special_defense}
          </span>
        </div>
      </div>

      <Link
        to="/monster/$id"
        params={{ id: monster.id }}
        className="block w-full rounded bg-blue-500 px-4 py-2 text-center text-white transition-colors hover:bg-blue-600"
      >
        {t('monster.moreDetails')}
      </Link>
    </div>
  );
}
