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
        className={`px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${rarityConfig.badgeGradient} text-white shadow-lg`}
        style={{
          boxShadow: `0 2px 8px ${rarityConfig.glowColor}`
        }}
      >
        {rarityConfig.label}
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className={`px-3 py-1.5 text-sm font-bold rounded-lg bg-gradient-to-r ${rarityConfig.badgeGradient} text-white shadow-lg transform -rotate-12 absolute -top-2 -right-2 z-10`}
        style={{
          boxShadow: `0 4px 12px ${rarityConfig.glowColor}`
        }}
      >
        {rarityConfig.label}
      </div>
      
      <div 
        className="absolute -top-2 -right-2 w-16 h-8 rounded-lg opacity-30 blur-sm transform -rotate-12"
        style={{
          background: `linear-gradient(135deg, ${rarityConfig.color}, transparent)`
        }}
      />
    </div>
  );
}
