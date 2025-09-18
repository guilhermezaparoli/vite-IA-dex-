import type { Monster } from "../api/queries/monsters/useFetchAllMonsters";

export type RarityLevel = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface RarityConfig {
  level: RarityLevel;
  label: string;
  color: string;
  borderColor: string;
  glowColor: string;
  badgeGradient: string;
}

export const rarityConfigs: Record<RarityLevel, RarityConfig> = {
  common: {
    level: 'common',
    label: 'Comum',
    color: '#9ca3af',
    borderColor: '#6b7280',
    glowColor: 'rgba(156, 163, 175, 0.3)',
    badgeGradient: 'from-gray-400 to-gray-600'
  },
  uncommon: {
    level: 'uncommon',
    label: 'Incomum',
    color: '#10b981',
    borderColor: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    badgeGradient: 'from-emerald-400 to-emerald-600'
  },
  rare: {
    level: 'rare',
    label: 'Raro',
    color: '#3b82f6',
    borderColor: '#2563eb',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    badgeGradient: 'from-blue-400 to-blue-600'
  },
  epic: {
    level: 'epic',
    label: 'Épico',
    color: '#a855f7',
    borderColor: '#9333ea',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    badgeGradient: 'from-purple-400 to-purple-600'
  },
  legendary: {
    level: 'legendary',
    label: 'Lendário',
    color: '#f59e0b',
    borderColor: '#d97706',
    glowColor: 'rgba(245, 158, 11, 0.7)',
    badgeGradient: 'from-amber-400 via-orange-500 to-red-500'
  }
};

export function calculateMonsterRarity(monster: Monster): RarityLevel {
  const totalStats = monster.hp + monster.attack + monster.defense + 
                    monster.speed + monster.special_attack + monster.special_defense;
  
  if (totalStats >= 600) return 'legendary';
  if (totalStats >= 500) return 'epic';
  if (totalStats >= 400) return 'rare';
  if (totalStats >= 300) return 'uncommon';
  return 'common';
}

export function getRarityConfig(monster: Monster): RarityConfig {
  const rarity = calculateMonsterRarity(monster);
  return rarityConfigs[rarity];
}
