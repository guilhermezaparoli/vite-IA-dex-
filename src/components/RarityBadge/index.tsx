import { getRarityConfig } from '../../utils/rarity';
import type { Monster } from '../../api/queries/monsters/useFetchAllMonsters';

interface RarityBadgeProps {
  monster: Monster;
  variant?: 'badge' | 'small';
}

export function RarityBadge({ monster, variant = 'badge' }: RarityBadgeProps) {
  const rarityConfig = getRarityConfig(monster);

  if (variant === 'small') {
    return (
      <div
        className={`rounded-full bg-gradient-to-r px-2 py-1 text-xs font-semibold ${rarityConfig.badgeGradient} text-white shadow-lg`}
        style={{
          boxShadow: `0 2px 8px ${rarityConfig.glowColor}`,
        }}
      >
        {rarityConfig.label}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`rounded-lg bg-gradient-to-r px-3 py-1.5 text-sm font-bold ${rarityConfig.badgeGradient} absolute -top-2 -right-2 z-10 -rotate-12 transform text-white shadow-lg`}
        style={{
          boxShadow: `0 4px 12px ${rarityConfig.glowColor}`,
        }}
      >
        {rarityConfig.label}
      </div>

      <div
        className="absolute -top-2 -right-2 h-8 w-16 -rotate-12 transform rounded-lg opacity-30 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${rarityConfig.color}, transparent)`,
        }}
      />
    </div>
  );
}
